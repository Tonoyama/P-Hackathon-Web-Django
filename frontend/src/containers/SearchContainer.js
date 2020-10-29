import { connect } from "react-redux";

import Search from "../components/Search";

const mapStateToProps = state => ({
  registration_message: state.auth.registration_message
});

export default connect(mapStateToProps)(Search);
