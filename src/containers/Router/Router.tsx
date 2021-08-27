import React, { memo } from 'react'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import List from '../List'
import Detail from '../Detail'

//   <Route exact path="/:id" component={Detail} />
const Router = () => {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={List} />
            <Route exact path="/:id" component={Detail} />
            <Redirect to="/" />
        </Switch>
    </BrowserRouter>
  )
}

export default memo(Router)
