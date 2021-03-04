import React from 'react';

import GenHeader from "../header/gen-header"
import GenFooter from "../footer/gen-footer"
import Landing from "../wfg-body/landing"

const GeneralPage = () => {
    return (
        <div>
            <GenHeader />
            <Landing />
            <GenFooter />
        </div>
    );
};

export default GeneralPage;