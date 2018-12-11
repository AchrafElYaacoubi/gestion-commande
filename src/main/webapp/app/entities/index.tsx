import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Client from './client';
import Commande from './commande';
import Produit from './produit';
import Facture from './facture';
import Livraison from './livraison';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/client`} component={Client} />
      <ErrorBoundaryRoute path={`${match.url}/commande`} component={Commande} />
      <ErrorBoundaryRoute path={`${match.url}/produit`} component={Produit} />
      <ErrorBoundaryRoute path={`${match.url}/facture`} component={Facture} />
      <ErrorBoundaryRoute path={`${match.url}/livraison`} component={Livraison} />
      {/* jhipster-needle-add-route-path - JHipster will routes here */}
    </Switch>
  </div>
);

export default Routes;
