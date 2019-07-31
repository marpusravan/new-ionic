import { Component, OnInit, ViewChild } from '@angular/core';
import { ENV } from '@app/env';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { Store } from '@ngrx/store';
import { Events, Nav, Platform, IonicApp } from 'ionic-angular';
import { LogProvider } from 'ionic-log-file-appender';
import { SmartAudioProvider } from '../providers/smart-audio/smart-audio';
import { MessagesService } from '../pages/home/services/messages.service';
import { AstroFastInit } from '../providers/authentication/app.fast-init';
import { eventDictionary } from '../providers/logger/event.dictionary';
import { TrackerService } from '../providers/logger/tracker.service';
import { MockupJsonProvider } from '../providers/mockup-json/mockup-json';
import * as AppStoreActions from '../store/app-store.actions';
import * as AppReducers from '../store/app.reducers';
import * as moment from 'moment';
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocketProvider } from '../providers/socket-service/socket';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { activityDictionary } from '../providers/logger/activity.dictionary';
declare var appExitPlugin: any;

@Component({
  selector: "ion-app",
  templateUrl: "app.html"
})
export class AstroApp implements OnInit {

  @ViewChild(Nav) nav: Nav;
  rootPage: string = "HomePage";
  isSplashDone = false;
  showSplash = false;
  public lottieConfigProcessing: Object;
  public splashInitialAnimation: Object;
  public firstAnimation: any;
  public deviceHeight: any;
  public deviceWidth: any;
  public showLoading = false;
  private isOverallAnimations: boolean;
  public clickSubscription: Subscription;
  public pauseSubscription: Subscription;
  clickStream: Observable<any>;
  private intervalID: number = -1;

  constructor(
    public platform: Platform,
    public mockupJson: MockupJsonProvider,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
    private log: LogProvider,
    private astroFastInit: AstroFastInit,
    private tracker: TrackerService,
    private messages: MessagesService,
    private store: Store<AppReducers.AppState>,
    private events: Events,
    private smartAudio: SmartAudioProvider,
    private userSettings: UserSettingsProvider,
    private ionicApp : IonicApp,
    private splashScreen: SplashScreen,
    private socket: SocketProvider
  ) { }

  ngOnInit(): void {
    this.platform.resume.subscribe(() => {
      this.store.select("appStoreReducer")
      .take(1)
      .map(data => data.lastActiveTimestamp)
      .subscribe((connected) => {
        const lastActiveTimestamp = moment(connected);
        this.checkForInactivity(lastActiveTimestamp);
      });
      this.tracker.trackEvent(eventDictionary.enterForeground);
    });

    this.platform.pause.subscribe(() => {
      this.checkForInactivity(moment());
    });
    // Processing animation with loop
    this.splashInitialAnimation = {
      path: "assets/splash/Squares_Intro_30FPS.json",
      renderer: "svg",
      prerender: true,
      autoplay: false,
      loop: false,

    };
    this.lottieConfigProcessing = {
      path: "assets/splash/astro-processingREV.json",
      renderer: "svg",
      prerender: true,
      autoplay: true,
      loop: true,
      rendererSettings: {
        className: "splash-screen"
      }
    };

    this.events.subscribe('loading:show', () => {
      this.showLoading = true;
    });

    this.events.subscribe('loading:hide', () => {
      this.showLoading = false;
    });

    this.platform.ready().then(() => {
      this.deviceHeight = this.platform.height();
      this.deviceWidth = this.platform.width();
      this.statusBar.hide();
      if(this.platform.is("android")){
        setTimeout(()=>{
          this.splashScreen.hide();
        },400)
      }
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.astroFastInit.isPhoneManagementPermissionAvailable()
        .subscribe((permissionsAvailable) => {
          if (permissionsAvailable) {
            this.listenToBackgroundAndPause();
            this.astroFastInit.executeInitialization().subscribe(
              (initializingData) => {
                this.userSettings.comparePreferences();
                if (initializingData.showLoading) {
                  this.store.dispatch(new AppStoreActions.SetIsLoadingPage({ loading: true }));
                  this.showSplash = true;
                  setTimeout(() => {
                    this.firstAnimation.play();
                    setTimeout(() => {
                      this.smartAudio.playSound("appStarts");
                    }, 300);
                    setTimeout(() => {
                      setTimeout(() => {
                        this.store.dispatch(new AppStoreActions.SetIsLoadingPage({ loading: false }));
                      }, 1500);
                      this.firstAnimation.stop();
                      this.showSplash = false;
                      this.isSplashDone = true;
                    }, 3100);
                  }, 300);
                }
                if (initializingData.page) {
                  this.store.select("appStoreReducer")
                    .filter(data => {
                      return data.isLoadingPage === false
                    })
                    .map(data => true)
                    .take(1)
                    .subscribe(canShow => {
                      if (canShow) {
                        this.isSplashDone = false;
                        this.showSplash = false;
                        this.nav.push(initializingData.page,
                          { onboarding: false },
                          {
                            animate: true,
                            animation: 'md-transition'
                          });
                      }
                    });
                }
              },
              (err) => {
                //remove all socket listeners when auth failed
                this.socket.callSessionTimeout();
                if (err === "timeouted") {
                  this.failLoginAttempt("There was a problem fetching your data for initial use. Please try again later.");
                } else {
                  this.failLoginAttempt();
                }
              });
            this.store.select("appStoreReducer")
              .filter(data => data.reinitialize === true)
              .subscribe(trigger => {
                this.store.dispatch(new AppStoreActions.SetReinitialize({ reinitialize: false }));
                this.store.select("communication")
                  .map(data => data.showReconnectMessage)
                  .take(1)
                  .subscribe(show => {
                    if (show) {
                      this.messages.pushMessage({
                        conversationID: "",
                        message: {
                          type: "text",
                          text: "Hang on, trying to connect...",
                          speech: ""
                        },
                        from: "admin"
                      });
                    }
                    this.astroFastInit.executeInitialization()
                      .take(1)
                      .subscribe();
                  });
              });
          } else {
            this.failLoginAttempt(`Some permissions are missing, please grant the permissions and try again.`);
          }
        });
    });

    this.isOverallAnimations = ENV.isAnimationsShow
  }

  handleFirstAnimation(anim: any) {
    this.firstAnimation = anim;
    this.firstAnimation.setSpeed(ENV.splashScreenSpeed);
    this.firstAnimation.stop();
  }

  failLoginAttempt(message?: string) {
    this.isSplashDone = false;
    if (message) {
      this.nav.push("ErrorPage", {
        message: message
      },
        {
          animate: true,
          animation: 'md-transition'
        });
    } else {
      this.nav.push("ErrorPage",
        {
          animate: true,
          animation: 'md-transition'
        });
    }
  }

  private listenToBackgroundAndPause() {
    this.tracker.startTracking();
    this.log.init();
    this.platform.pause.subscribe(() => {
      this.tracker.trackEvent(eventDictionary.enterBackground);
      let timestamp = (moment().valueOf() / 1000).toString();
      appExitPlugin.setTerminationTime(timestamp,
        (msg) => {

        },
        (err) => {

        }
      )
    });
  }

  public detectTap() {
    this.clickStream = Observable.fromEvent(window, 'click');
    this.clickSubscription = this.clickStream.subscribe(() => {
      this.getLastActiveTimeStampAndStore()
    });
  }


  public checkForInactivity(lastActiveTimestamp: moment.Moment) {
    let timeoutSessionBridge = moment();
    timeoutSessionBridge.subtract(15, 'minutes');
    if ((lastActiveTimestamp.isBefore(timeoutSessionBridge) || lastActiveTimestamp.isSame(timeoutSessionBridge) ) &&
      this.nav.getActive().component.name != "LogoutPage") {
        this.unSubscribeToClickEvents();
        clearInterval(this.intervalID);
        this.events.publish('loggedOut:true');
        this.socket.callSessionTimeout();
        this.nav.push("LogoutPage")
          .then((value) => {
            const views = this.nav.getViews();
            let indexHome = -1;
            for (let index = 0; index < views.length && indexHome === -1; index++) {
              if (views[index].name === "HomePage") {
                indexHome = index;
              }
            }
            if (indexHome !== -1) {
              this.nav.remove(indexHome);
            }
          })
          .catch(err => {
            this.tracker.activity(activityDictionary.navigationPushFailed, err.message);
            setTimeout(() => {
              this.store.dispatch(new AppStoreActions.SetReinitialize({ reinitialize: true }));
            }, 500);
          });
    }
  }

  public subscribeForInactivity() {
    clearInterval(this.intervalID);
    this.intervalID = setInterval(() => {
      this.store.select("appStoreReducer")
        .take(1)
        .map(data => data.lastActiveTimestamp)
        .subscribe((connected) => {
          const lastActiveTimestamp = moment(connected);
          this.checkForInactivity(lastActiveTimestamp);
        });
    }, ENV.logoutUserCheckTime);
  }

  public unSubscribeToClickEvents() {
    if(this.clickSubscription != null){
      this.clickSubscription.unsubscribe();
      this.clickSubscription = null;
    }
  }
  public getLastActiveTimeStampAndStore() {
    this.store.select('appStoreReducer')
    .take(1)
    .subscribe(appState => {
      if(!appState.loggedOut){
        this.store.dispatch(new AppStoreActions.SetUserTimestamp({ setLastTimestamp: moment().toISOString() }));
        this.subscribeForInactivity();
      }
    });
  }
}
