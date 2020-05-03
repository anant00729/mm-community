import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getAllMembers} from '../../../../actions/members'


function MemberItem({getAllMembers, homeMemberList, type}) {
  useEffect(() => {
    if(type) getAllMembers(type);
  }, [type])

  console.log('homeMemberList :>> ', homeMemberList);
  if(homeMemberList.length === 0){
    return (
      <div className="mx-auto loader mt-56"></div> 
    )
  }else {
    return <>
      {homeMemberList.map((_m, index) => {
      return (
        <div key={index} className="md:w-1/3 w-1/2 px-2 mt-4">
          <div className="rounded bg-white text-center py-6">
            <img 
                className="w-20 h-20 rounded-full mx-auto"
                src={_m.profile_image} 
                alt="profile_image"/>
            <p className="font-sen text-md font-bold mt-4">{_m.name}</p>
            <p className="font-sen text-gray-700">Dev Evangelist, Outreach at Hashnode</p>
            <p className="font-sen mt-1">Joined: <strong>May 17, 2019</strong></p>
          </div>
        </div>  
          )
        })}
    </>
  }
}

MemberItem.propTypes = {
  getAllMembers: PropTypes.func.isRequired
};


   
const mapStateToProps = state => ({
  homeMemberList: state.members.homeMemberList,
});

const allActions = {
  getAllMembers
}

export default connect(mapStateToProps, allActions)(MemberItem);

