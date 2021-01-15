import React from 'react'
import { Switch } from 'react-router'
import { Router, Route } from 'react-router-dom'
import history from '../history'
import { Paths } from './types'
import { NotFound } from './NotFound'
import { StyledRoutes, StyledRoutesContainer } from './style'
import Home from 'modules/home'
import LandingPage from 'modules/dashboard'

const notFoundRoute: RouteDefinition = {
  path: '*',
  component: NotFound,
  protected: false,
}

export const routes: RouteDefinition[] = [
  {
    path: Paths.root,
    component: LandingPage,
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
    <StyledRoutesContainer>
      <Router history={history}>
        <StyledRoutes>
          <Switch>
            {routes.map((route, i) => {
              const render = getRouteRenderWithAuth(route, i)
              const rest = { render }
              return <Route key={i} path={route.path} exact={true} {...rest} />
            })}
          </Switch>
        </StyledRoutes>
      </Router>
    </StyledRoutesContainer>
  )
}

export default Routes
