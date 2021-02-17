import React from 'react'
import { connect } from 'react-redux'
import AdminDashboard from './AdminDashboard'
import OwnerDashboard from './OwnerDashboard'
import TreasuryDashboard from './TreasuryDashboard'

const Dashboard = (props: any) => {
  const { userInfo } = props
  return (
    <div>
      {!!userInfo && userInfo.role === 1 && <AdminDashboard />}
      {!!userInfo && userInfo.role === 2 && <OwnerDashboard />}
      {!!userInfo && userInfo.role === 3 && <TreasuryDashboard />}
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default connect(mapStateToProps)(Dashboard)
