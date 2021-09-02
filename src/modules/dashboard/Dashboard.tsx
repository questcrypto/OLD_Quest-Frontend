import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AdminDashboard from 'modules/admin/dashboard'
import OwnerDashboard from 'modules/owner/dashboard'
import TreasuryDashboard from 'modules/treasury/dashboard'
import GeneralUserDashboard from 'modules/general-user'

const Dashboard = (props: any) => {
  const { userInfo } = props
  useEffect(() => {
    console.log(userInfo);
  }, [])
  return (
    <div>

      {/* {
        !!userInfo ? userInfo.role === 1 ? <AdminDashboard /> :
          userInfo.role === 2 ? <OwnerDashboard /> : userInfo.role === 3 ? <TreasuryDashboard /> : '' : <OwnerDashboard />
      } */}

      {!!userInfo && userInfo.role === 1 && <AdminDashboard />}
      {!!userInfo && userInfo.role === 2 && <OwnerDashboard />}
      {!!userInfo && userInfo.role === 3 && <TreasuryDashboard />}
      {!userInfo && <GeneralUserDashboard />}

    </div>
  )
}

const mapStateToProps = (state: any) => ({
  userInfo: state.user.userInfo,
})
export default connect(mapStateToProps)(Dashboard)
