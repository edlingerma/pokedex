import React, { memo } from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import List from '../List'
import Detail from '../Detail'
import ScrollToTop from '../../utils/scrollToTop'

const Router = () => {
  return (
    <BrowserRouter>
        <ScrollToTop />
        <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/:id" component={Detail} />
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
  )
}

export default memo(Router)
