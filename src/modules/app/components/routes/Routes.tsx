import React from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch } from 'react-router'
import { Router, Route } from 'react-router-dom'
import { StyledRoutesWrapper, StyledRoutesContainer, StyledRoutes } from './style'
import Loader from 'shared/loader'
import history from '../history'
import { Paths } from './types'
import { NotFound } from './NotFound'
import Dashboard from 'modules/dashboard'
import PropertyForm from 'modules/property-form'
import PropertyDetails from 'modules/property-details'
import { Login } from 'modules/auth'
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
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.dashboard,
    component: Dashboard,
    protected: false,
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.addPropertyForm,
    component: PropertyForm,
    protected: false,
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.propertyDetails,
    component: PropertyDetails,
    protected: false,
    redirect: Paths.root,
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
interface StateProps {
  loggedIn: boolean
  isLoaded: boolean
}

function getRouteRenderWithAuth(loggedIn: boolean, route: RouteDefinition, i: number) {
  if (loggedIn === route.protected) {
    return () => <route.component />
  } else if (loggedIn && !route.protected) {
    return () => <Redirect to={`${Paths.root}`} />
  } else {
    return () => <Redirect to={route.redirect!} />
  }
}

const Routes: React.FC<Props & RoutesProps & StateProps> = ({ isLoaded, loggedIn }) => {
  return (
    <StyledRoutesWrapper>
      <Router history={history}>
        <Grid container>
          {loggedIn && (
            <Grid item xs={2}>
              <LeftPanel />
            </Grid>
          )}

          <Grid item xs={loggedIn ? 10 : 12}>
            <StyledRoutes>
              {loggedIn && <TopPanel />}
              <Switch>
                {routes.map((route, i) => {
                  const render = getRouteRenderWithAuth(loggedIn, route, i)
                  const rest = { render }
                  return isLoaded ? <Route key={i} path={route.path} exact {...rest} /> : null
                })}
              </Switch>
            </StyledRoutes>
          </Grid>
        </Grid>
      </Router>
    </StyledRoutesWrapper>
  )
}

const mapStateToProps = (state: any) => ({
  loggedIn: state.user.loggedIn,
  isLoaded: state.user.isLoaded,
})

export default connect(mapStateToProps)(Routes)
