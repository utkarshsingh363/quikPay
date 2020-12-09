import React from 'react';
import './App.css';
import Layout from './layout/mainLayout/Layout'
import BlankLayout from './layout/blankLayout'
import PaylinkFormLayout from './layout/paylinkFormLayout/paylinkFormLayout'
// import FormBuilderView from './views/formBuilderView/FormBuilderView'
import TestView from './views/testView/testView'
import RouterWrapper from './hoc/RouterWrapper'
import PaylinkView from './views/paylinkView/PaylinkView'
import MerchantPaylinkView from './views/merchantPaylinkView/MerchantPaylinkView'
import ProcessingTransactionView from './views/processingTransactionView/processingTransactionView'
import StatusView from './views/statusView/statusView'

import { Switch } from "react-browser-router";


function App() {
  return (
    <div className="app">
      <Switch>
      <RouterWrapper
          exact
          path="/"
          layout={Layout}
          component={MerchantPaylinkView}
        />
        <RouterWrapper
          exact
          path="/createPaylink"
          layout={Layout}
          component={TestView}
        />
        <RouterWrapper
          exact
          path="/getFormDetail"
          // layout={Layout}
          layout={PaylinkFormLayout}
          component={PaylinkView}
        />

        <RouterWrapper
          exact
          path="/processingTransaction"
          layout={BlankLayout}
          component={ProcessingTransactionView}
        />

        <RouterWrapper
          exact
          path="/getFormDetail/adminView"
          disablePayNow={true}
          layout={Layout}
          component={PaylinkView}
        />

        <RouterWrapper
          exact
          path="/status"
          layout={PaylinkFormLayout}
          component={StatusView}
        />
      </Switch>
    </div>
  );
}

export default App;
