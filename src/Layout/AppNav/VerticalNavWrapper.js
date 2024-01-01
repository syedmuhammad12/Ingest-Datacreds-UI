import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import MetisMenu from 'react-metismenu';

import {MainNav, TemplateNav, FileManagementNav,StructuredFileNav, RoleNav, UserNav, SettingsNav, CustomerNav, ComponentsNav, FormsNav, WidgetsNav, ChartsNav} from './NavItems';
var user_data=JSON.parse(localStorage.getItem('user_data'));
class Nav extends Component {

    state = {};
    findArrayElementByTitle(array, title) {
        return array.find((element) => {
          if (element=== title){
            return true;
          }
        });
        
    }
    render() {
        return (
            <Fragment>
                
                <h5 className="app-sidebar__heading">Menu</h5>
                {(() => {
                    if (this.findArrayElementByTitle(user_data.data.modules,'dashboard')=="dashboard" || this.findArrayElementByTitle(user_data.data.modules,'all')=="all") {
                    return (
                        <MetisMenu content={MainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    )
                    }
                })()}

                {(() => {
                    if (this.findArrayElementByTitle(user_data.data.modules,'customers')=="customers" || this.findArrayElementByTitle(user_data.data.modules,'all')=="all") {
                    return (
                        <MetisMenu content={CustomerNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    )
                    }
                })()}

                {(() => {
                    if (this.findArrayElementByTitle(user_data.data.modules,'users')=="users" || this.findArrayElementByTitle(user_data.data.modules,'all')=="all") {
                    return (
                        <MetisMenu content={UserNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    )
                    }
                })()}

                {(() => {
                    if (this.findArrayElementByTitle(user_data.data.modules,'roles')=="roles" || this.findArrayElementByTitle(user_data.data.modules,'all')=="all") {
                    return (
                        <MetisMenu content={RoleNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    )
                    }
                })()}

                {(() => {
                    if (this.findArrayElementByTitle(user_data.data.modules,'file template')=="file template" || this.findArrayElementByTitle(user_data.data.modules,'all')=="all") {
                    return (
                        <MetisMenu content={TemplateNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-file" />
                    )
                    }
                })()}
                
                {(() => {
                    if (this.findArrayElementByTitle(user_data.data.modules,'file-management')=="file-management" || this.findArrayElementByTitle(user_data.data.modules,'all')=="all") {
                    return (
                        <MetisMenu content={FileManagementNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-file" />
                    )
                    }
                })()}

                {(() => {
                    if (this.findArrayElementByTitle(user_data.data.modules,'structured-file-training')=="structured-file-training" || this.findArrayElementByTitle(user_data.data.modules,'all')=="all") {
                    return (
                        <MetisMenu content={StructuredFileNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-file" />
                    )
                    }
                })()}
                
                {/* <MetisMenu content={SettingsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/> */}
                {/* <h5 className="app-sidebar__heading">UI Components</h5>
                <MetisMenu content={ComponentsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/> */}
                {/* <h5 className="app-sidebar__heading">Widgets</h5>
                <MetisMenu content={WidgetsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Forms</h5>
                <MetisMenu content={FormsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Charts</h5>
                <MetisMenu content={ChartsNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/> */}
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);