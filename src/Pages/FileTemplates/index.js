import React, { Component, Fragment } from 'react';
import {Route} from 'react-router-dom';

import FileTemplates from './Basic';

import AppHeader from '../../Layout/AppHeader';
import AppSidebar from '../../Layout/AppSidebar';
import AppFooter from '../../Layout/AppFooter';

const FileTemplate = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <FileTemplates />
                    {/* <Route path={`${match.url}`} component={FileTemplates}/> */}
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default FileTemplate;