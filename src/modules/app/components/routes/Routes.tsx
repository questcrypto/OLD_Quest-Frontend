import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Switch } from 'react-router'
import { Router, Route } from 'react-router-dom'
import { useStyles } from './style'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Loader from 'shared/loader-components/loader'
import history from '../history'
import { Paths } from './types'
import { NotFound } from './NotFound'
// import { Login } from 'modules/auth'
import { SignUp } from 'modules/auth'
import Dashboard from 'modules/dashboard'
import { AddPropertyForm, EditPropertyForm } from 'modules/property-form'
import PropertyDetails from 'modules/property-details'
import TreasuryPropertyDetails from 'modules/treasury/treasury-details'
import Auction from 'modules/auction'
import AuctionDetails from 'modules/auction-details'
import UpgradeBidDetails from 'modules/auction-details/UpgradeBidDetails'
import LeftPanel from 'modules/app/components/navbar/left-panel/LeftPanel'
import TopPanel from 'modules/app/components/navbar/top-panel/TopPanel'
import OwnerPropertyDetails from 'modules/owner/owner-property-details'
import { handleDrawerOpen, handleDrawerClose } from 'logic/actions/drawer.open'
import { IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Portfolio from 'modules/portfolio'

const notFoundRoute: RouteDefinition = {
  path: '*',
  component: NotFound,
  protected: false,
}

export const routes: RouteDefinition[] = [
  // {
  //   path: Paths.root,
  //   component: Login,
  //   protected: false,
  //   redirect: Paths.root,
  //   title: '',
  // },
  {
    path: Paths.portfolio,
    component: Portfolio,
    protected: true,
    redirect: Paths.root,
    title: '',
  },
  {
    // path: Paths.root,
    path: Paths.login,
    component: SignUp,
    protected: false,
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.dashboard,
    component: Dashboard,
    protected: true,
    redirect: Paths.root,
    title: '',
  },

  {
    path: Paths.addPropertyForm,
    component: AddPropertyForm,
    protected: true,
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.propertyDetails + '/:propertyId',
    component: PropertyDetails,
    protected: true,
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.ownerPropertyDetails + '/:propertyId',
    component: OwnerPropertyDetails,
    protected: true,
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.editPropertyForm + '/:propertyId',
    component: EditPropertyForm,
    protected: true,
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.viewPropertyForm + '/:propertyId',
    component: EditPropertyForm,
    protected: true,
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.treasuryPropertyDetails + '/:propertyId',
    component: TreasuryPropertyDetails,
    protected: true,
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.auction,
    component: Auction,
    protected: true,
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.auctionDetails + '/:auctionId',
    component: AuctionDetails,
    protected: true,
    redirect: Paths.root,
    title: '',
  },
  {
    path: Paths.upgradeBid + '/:auctionId',
    component: UpgradeBidDetails,
    protected: true,
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
  authLoading: boolean
}

interface DrawerProps {
  openDrawer: boolean
}

function getRouteRenderWithAuth(loggedIn: boolean, route: RouteDefinition, i: number) {
  if (loggedIn === route.protected) {
    return () => <route.component />
  } else if (loggedIn && !route.protected) {
    // return () => <Redirect to={`${Paths.dashboard}`} />
    return () => <Redirect to={`${Paths.portfolio}`} />
  } else {
    return () => <Redirect to={route.redirect!} />
  }
}

const Routes: React.FC<Props & RoutesProps & StateProps & DrawerProps & any> = (props) => {

  const { isLoaded, loggedIn, authLoading } = props

  const [width] = useState(window.innerWidth)

  useEffect(() => {
    if (width < 990) {
      props.handleDrawerClose()
    }
    return () => {}
  })

  const classes = useStyles()
  return (
    <Router history={history}>
      <Box className={classes.root}>
        {loggedIn && width <= 990 && (
          <>
            <IconButton style={{ position: 'absolute' }} onClick={() => props.handleDrawerOpen()}>
              <MenuIcon />
            </IconButton>
            <LeftPanel />
          </>
        )}
        <Grid container>
          {width > 990 && (
            <Grid item xs={2}>
              {loggedIn && (
                <>
                  <LeftPanel />
                </>
              )}
            </Grid>
          )}
          <Grid item xs={loggedIn ? (width > 990 ? 10 : 12) : 12} className={classes.rightPanelStyle}>
            {loggedIn && <TopPanel />}
            <Switch>
              {routes.map((route, i) => {
                if (authLoading) {
                  return <Loader key={i} />
                } else {
                  const render = getRouteRenderWithAuth(loggedIn, route, i)
                  const rest = { render }
                  return isLoaded ? <Route key={i} path={route.path} exact {...rest} /> : null
                }
              })}
            </Switch>
          </Grid>
        </Grid>
      </Box>
    </Router>
  )
}

const mapStateToProps = (state: any) => ({
  // loggedIn: state.user.loggedIn,
  // isLoaded: state.user.isLoaded,
  loggedIn: true,
  isLoaded: true,
  authLoading: state.user.authLoading,
  openDrawer: state.drawer.openDrawer,
})

export default connect(mapStateToProps, { handleDrawerOpen, handleDrawerClose })(Routes)
