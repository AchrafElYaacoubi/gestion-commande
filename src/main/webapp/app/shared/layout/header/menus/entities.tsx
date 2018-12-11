import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/client">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Client
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/commande">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Commande
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/produit">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Produit
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/facture">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Facture
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/livraison">
      <FontAwesomeIcon icon="asterisk" fixedWidth />&nbsp;Livraison
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
