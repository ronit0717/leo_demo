import React, { Component } from 'react';

class index extends Component {
    render() {
        return (
            <div className="modal fade" id="td-sign-out">
              <div className="modal-dialog">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h4 className="modal-title">Want to leave?</h4>
                          <button type="button" className="close" data-dismiss="modal">&times;</button>
                      </div>
                      <div className="modal-body">
                          Press logout to leave
                      </div>
                      <div className="modal-footer">
                          <button type="button" class="btn btn-success" data-dismiss="modal">Stay Here</button>
                          <button type="button" class="btn btn-danger" data-dismiss="modal">Logout</button>
                      </div>
                  </div>
              </div>
            </div>
        );
    }
}

export default index;