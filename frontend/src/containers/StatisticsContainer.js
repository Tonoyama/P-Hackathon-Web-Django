import { connect } from "react-redux";

import Statistics from "../components/Statistics";

const mapStateToProps = state => ({
  registration_message: state.auth.registration_message
});

export default connect(mapStateToProps)(Statistics);
