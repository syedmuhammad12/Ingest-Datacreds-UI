import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import cx from 'classnames';
import {withRouter} from 'react-router-dom';

import ResizeDetector from 'react-resize-detector';

import AppMain from '../../Layout/AppMain';
import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';
// import axiosInterceptor from '../../utils/axiosInterceptor'
// import '../../utils/overrideFetch.js'
// localStorage.setItem('isLoggedIn',JSON.stringify(1));
// localStorage.setItem('role_data',JSON.stringify({ value: '1', label: 'dashboard' }));
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.current_path=props.location.pathname
        this.state = {
            closedSmallerSidebar: false,
            width: undefined
        };

    }

    onResize = (width) => this.setState({ width });
   
    isLoggedIn=JSON.parse(localStorage.getItem('isLoggedIn'));
    user_data=JSON.parse(localStorage.getItem('user_data'));

    setEditModule() {
        if(this.current_path.includes('editroles')){
            
            var role_id=this.current_path.split('/')[2];
            fetch('/roles/rolesedit/'+role_id)
            .then(response => {
              return response.json()
            })
            .then(data => {
              var temp_default=[]
              data.modules.map((val) => {
                var curr=val.IdModuleAccess
                temp_default.push({ label:  curr.ModuleName, value:curr.IdModuleAccess});
              })
              localStorage.setItem('role_data'+role_id,JSON.stringify(temp_default));
            })
        }
    }

    findModuleByName(array, title) {
        return array.find((element) => {
            
          if (element== title){
            return true;
          }
        });
        
    }
    render() {
        const { width } = this.state;

        let {
            colorScheme,
            enableFixedHeader,
            enableFixedSidebar,
            enableFixedFooter,
            enableClosedSidebar,
            closedSmallerSidebar,
            enableMobileMenu,
            enablePageTabsAlt,
        } = this.props;

        return (
            <Fragment>
                <div className={cx(
                    "app-container app-theme-" + colorScheme,
                    {'fixed-header': enableFixedHeader},
                    {'fixed-sidebar': enableFixedSidebar || width < 1250},
                    {'fixed-footer': enableFixedFooter},
                    {'closed-sidebar': enableClosedSidebar || width < 1250},
                    {'closed-sidebar-mobile': closedSmallerSidebar || width < 1250},
                    {'sidebar-mobile-open': enableMobileMenu},
                )}>
                    {(() => {
                    if (this.isLoggedIn===1 && this.current_path!=="/login") {
                        const exist=this.findModuleByName(this.user_data.data.modules,this.current_path.replace('/', ''))
                        console.log(exist);
                        if (exist==this.current_path.replace('/', '') || this.user_data.data.modules[0]=="all") {
                            // console.log(this.findArrayElementByTitle(this.user_data.data.modules,this.current_path.replace('/', '')));
                        this.setEditModule()
                        return (
                            <div>
                            <AppHeader />
                            <div className="app-main">
                                <AppSidebar />
                                <div className="app-main__outer">
                                    <div className="app-main__inner">
                                    <AppMain/>
                                    </div>
                                    <AppFooter />
                                </div>
                            </div>
                            </div>
                        )
                    }
                    else{
                        // console.log(this.user_data.data.modules[0]);
                        window.location.assign('/'+this.user_data.data.modules[0]);
                    }
                    }else if (this.isLoggedIn===1 && this.current_path==="/login") {
                        window.location.assign(`/dashboard`);
                      }
                    else if (this.isLoggedIn===null && this.current_path!=="/login") {
                        window.location.assign(`/login`);
                      } else {
                    return (
                        <AppMain/>
                    )
                    }
                })()}
                    
                    <ResizeDetector handleWidth onResize={this.onResize} />
                </div>
            </Fragment>
        )
    }
}

const mapStateToProp = state => ({
    colorScheme: state.ThemeOptions.colorScheme,
    enableFixedHeader: state.ThemeOptions.enableFixedHeader,
    enableMobileMenu: state.ThemeOptions.enableMobileMenu,
    enableFixedFooter: state.ThemeOptions.enableFixedFooter,
    enableFixedSidebar: state.ThemeOptions.enableFixedSidebar,
    enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
    enablePageTabsAlt: state.ThemeOptions.enablePageTabsAlt,

});

export default withRouter(connect(mapStateToProp)(Main));