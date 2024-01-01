import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";

import { ToastContainer } from "react-toastify";
// import Email from "../Email";
import { Bars } from  'react-loader-spinner'

const Dashboards = lazy(() => import("../../Pages/Dashboards"));

const Widgets = lazy(() => import("../../Pages/Widgets"));
const Elements = lazy(() => import("../../Pages/Elements"));
const Components = lazy(() => import("../../Pages/Components"));
const Charts = lazy(() => import("../../Pages/Charts"));
const Forms = lazy(() => import("../../Pages/Forms"));
const Tables = lazy(() => import("../../Pages/Tables"));
const DataExtract = lazy(() =>
  import("../../Pages/FileManagement/DataExtract")
);

const DataExtractTrainig = lazy(() =>
  import("../../Pages/StructuredFileTraining/DataExtract")
);
const FileTemplatesList = lazy(() =>
  import("../../Pages/FileTemplates/list")
)
const FileTemplateCreate = lazy(() =>
  import("../../Pages/FileTemplates/create")
)
const FileTemplateEdit = lazy(() =>
  import("../../Pages/FileTemplates/edit")
)
const FileListing = lazy(() =>
  import("../../Pages/FileManagement/Listing")
)

const StructuredFileTrainingList = lazy(() =>
  import("../../Pages/StructuredFileTraining/Listing")
)

const UnStrcturedTraining = lazy(() => import("../../Pages/FileManagement/UnStructured/Training"));
const UnStrcturedTesting = lazy(() => import("../../Pages/FileManagement/UnStructured/Testing"));
const Users = lazy(() => import('../../Pages/Users'));
const AddUser= lazy(() => import('../../Pages/Users/AddUser'));
const EditUser= lazy(() => import('../../Pages/Users/EditUser'));
const Roles=lazy(() => import('../../Pages/Roles'));
const AddRole=lazy(() => import('../../Pages/Roles/AddRole'));
const EditRoles=lazy(() => import('../../Pages/Roles/EditRoles'));
const Company=lazy(() => import('../../Pages/Company'));
const addcompany=lazy(() => import('../../Pages/Company/AddCompany'));
const editcompany=lazy(() => import('../../Pages/Company/EditCompany'));
const Login= lazy(() => import('../../Pages/Login'));



const email = lazy(() =>
  import("../../Pages/Email")
)
const sharepoint = lazy(() =>
  import("../../Pages/Sharepoint")
)

const AppMain = () => {
  return (
    <Fragment>
      {/* Components */}
      <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-5">
                Please wait while we load all the Components
                <small>
                  Because this is a demonstration we load at once all the
                  Components examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/components" component={Components} />
      </Suspense>

      {/* Forms */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-5">
                Please wait while we load all the Forms examples
                <small>
                  Because this is a demonstration we load at once all the Forms
                  examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/forms" component={Forms} />
      </Suspense>

      {/* Charts */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Charts examples
                <small>
                  Because this is a demonstration we load at once all the Charts
                  examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/charts" component={Charts} />
      </Suspense>

      {/* Tables */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-5">
                Please wait while we load all the Tables examples
                <small>
                  Because this is a demonstration we load at once all the Tables
                  examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/tables" component={Tables} />
      </Suspense>

      {/* Elements */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Elements examples
                <small>
                  Because this is a demonstration we load at once all the
                  Elements examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/elements" component={Elements} />
      </Suspense>

      {/* Dashboard Widgets */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Dashboard Widgets examples
                <small>
                  Because this is a demonstration we load at once all the
                  Dashboard Widgets examples. This wouldn't happen in a real
                  live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/widgets" component={Widgets} />
      </Suspense>

      {/* Data Extarct */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
              <Bars
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/data-extract/:id" component={DataExtract} />
      </Suspense>
      {/* Data Extarct Structured file Training */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
              <Bars
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/data-extract-structured-training/:id" component={DataExtractTrainig} />
      </Suspense>
      {/* Dashboards */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Dashboards examples
                <small>
                  Because this is a demonstration, we load at once all the
                  Dashboards examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/dashboard" component={Dashboards} />
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Dashboards examples
                <small>
                  Because this is a demonstration, we load at once all the
                  Dashboards examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/file-templates">
          <Route path="/file-templates" component={FileTemplatesList} exact />
          <Route path="/file-templates/create" component={FileTemplateCreate} />
          <Route path="/file-templates/edit/:id" component={FileTemplateEdit} />
        </Route>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Dashboards examples
                <small>
                  Because this is a demonstration, we load at once all the
                  Dashboards examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/unstructured/training-files">
          <UnStrcturedTraining />
        </Route>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Dashboards examples
                <small>
                  Because this is a demonstration, we load at once all the
                  Dashboards examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/unstructured/testing-files" component={UnStrcturedTesting} />
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
              <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/file-management" component={FileListing} />
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
              <Bars
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/structured-file-training" component={StructuredFileTrainingList} />
      </Suspense>
    {/* Users */}

    <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Please wait while we load all the Elements examples
                            <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/users" component={Users}/>
            </Suspense>

    {/* AddUsers */}

    <Suspense fallback={
        <div className="loader-container">
            <div className="loader-container-inner">
                <h6 className="mt-3">
                    Please wait while we load all the Elements examples
                    <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
                </h6>
            </div>
        </div>
    }>
        <Route path="/adduser" component={AddUser}/>
    </Suspense>


    {/*  EditUsers */}

    <Suspense fallback={
      <div className="loader-container">
          <div className="loader-container-inner">
              <h6 className="mt-3">
                  Please wait while we load all the Elements examples
                  <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
              </h6>
          </div>
      </div>
  }>
      <Route path="/edit/:user_id" component={EditUser}/>
  </Suspense>

                
  {/*  Roles */}

  
  <Suspense fallback={
      <div className="loader-container">
          <div className="loader-container-inner">
              <h6 className="mt-3">
                  Please wait while we load all the Elements examples
                  <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
              </h6>
          </div>
      </div>
  }>
      <Route path="/roles" component={Roles}/>
  </Suspense>
            

  {/*  AddRole */}
  <Suspense fallback={
      <div className="loader-container">
          <div className="loader-container-inner">
              <h6 className="mt-3">
                  Please wait while we load all the Elements examples
                  <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
              </h6>
          </div>
      </div>
  }>
      <Route path="/addrole" component={AddRole}/>
  </Suspense>



  {/*  EditRoles */}

  
  <Suspense fallback={
      <div className="loader-container">
          <div className="loader-container-inner">
              <h6 className="mt-3">
                  Please wait while we load all the Elements examples
                  <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
              </h6>
          </div>
      </div>
  }>
      <Route path="/editroles/:role_id" component={EditRoles}/>
  </Suspense>



      {/* Email */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Dashboards examples
                <small>
                  Because this is a demonstration, we load at once all the
                  Dashboards examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/e-mail" component={email} />
      </Suspense>

      {/* share-point */}
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <h6 className="mt-3">
                Please wait while we load all the Dashboards examples
                <small>
                  Because this is a demonstration, we load at once all the
                  Dashboards examples. This wouldn't happen in a real live app!
                </small>
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/share-point" component={sharepoint} />
      </Suspense>


      {/*  Company */}
      <Suspense fallback={
          <div className="loader-container">
              <div className="loader-container-inner">
                  <h6 className="mt-3">
                      Please wait while we load all the Elements examples
                      <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
                  </h6>
              </div>
          </div>
      }>
          <Route path="/customers" component={Company}/>
      </Suspense>

      {/* Add Company */}
      <Suspense fallback={
          <div className="loader-container">
              <div className="loader-container-inner">
                  <h6 className="mt-3">
                      Please wait while we load all the Elements examples
                      <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
                  </h6>
              </div>
          </div>
      }>
          <Route path="/addcompany" component={addcompany}/>
      </Suspense>

      {/* Edit Company */}
      <Suspense fallback={
          <div className="loader-container">
              <div className="loader-container-inner">
                  <h6 className="mt-3">
                      Please wait while we load all the Elements examples
                      <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
                  </h6>
              </div>
          </div>
      }>
          <Route path="/editcompany/:company_id" component={editcompany}/>
      </Suspense>
      {/* Login */}

      <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Please wait while we load all the Elements examples
                            <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/login" component={Login}/>
            </Suspense>
      <ToastContainer />
    </Fragment>
  );
};

export default AppMain;
