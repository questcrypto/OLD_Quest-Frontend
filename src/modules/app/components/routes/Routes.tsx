import React from 'react'
import { Switch } from 'react-router'
import { Router, Route } from 'react-router-dom'
import history from '../history'
import { Paths } from './types'
import { NotFound } from './NotFound'
import { StyledRoutes } from './style'
import Dashboard from 'modules/dashboard'
import PropertyForm from 'modules/property-form'
import PropertyDetails from 'modules/property-details'
import { Login } from 'modules/Login/Login'
import LeftPanel from 'modules/app/components/navbar/left-panel/LeftPanel'
import TopPanel from 'modules/app/components/navbar/top-panel/TopPanel'
import { Grid } from '@material-ui/core'

const notFoundRoute: RouteDefinition = {
  path: '*',
  component: NotFound,
  protected: false,
}

export const routes: RouteDefinition[] = [
  {
    path: Paths.root,
    component: Login,
    protected: false,
    title: '',
  },
  {
    path: Paths.dashboard,
    component: Dashboard,
    protected: false,
    title: '',
  },
  {
    path: Paths.addPropertyForm,
    component: PropertyForm,
    protected: false,
    title: '',
  },
  {
    path: Paths.propertyDetails,
    component: PropertyDetails,
    protected: false,
    title: '',
  },
].concat(notFoundRoute as any) // Ensure that notFound is the last route

export interface RouteDefinition {
  path: string
  protected?: boolean
  redirect?: string
  component?: any
  routes?: RouteDefinition[]
}

interface Props {}
interface RoutesProps {}
interface StateProps {}

function getRouteRenderWithAuth(route: RouteDefinition, i: number) {
  return () => <route.component />
}

const Routes: React.FC<Props & RoutesProps & StateProps> = () => {
  return (
    <div>
      <Router history={history}>
        <Grid container>
          {window.location.pathname !== '/' && (
            <Grid item xs={2}>
              <LeftPanel />
            </Grid>
          )}

          <Grid item xs={10}>
            {window.location.pathname !== '/' && <TopPanel />}

            <StyledRoutes>
              <Switch>
                {routes.map((route, i) => {
                  const render = getRouteRenderWithAuth(route, i)
                  const rest = { render }
                  return <Route key={i} path={route.path} exact={true} {...rest} />
                })}
              </Switch>
            </StyledRoutes>
          </Grid>
        </Grid>
      </Router>
    </div>
  )
}

export default Routes
