import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  
   let data = alerts.map(alert => {

    console.log('alert.alertType :', alert.alertType);
    return (
      <div 
      key={alert.id}
      id="snackbar" className={`${alert.alertType ? "show" : ""}`}>
      <div className={`bg-${alert.alertType}-600 text-center py-2 lg:px-4 rounded-lg w-full`}>
        <div className={`p-2 bg-${alert.alertType}-500 items-center text-${alert.alertType}-100 leading-none lg:rounded-full flex lg:inline-flex`} role="alert">
          <span className={`flex rounded-full bg-${alert.alertType}-600 uppercase px-2 py-1 text-xs font-bold mr-3`}>Error</span>
          <span className="font-semibold mr-2 text-left flex-auto">{alert.msg}</span>
        </div>
      </div>
      </div>
    )
   }
    
  );
  if(alerts !== null && alerts.length > 0){
    return data
  }else {
    return null
  }
}
  

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
