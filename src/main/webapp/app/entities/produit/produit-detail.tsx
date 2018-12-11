import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './produit.reducer';
import { IProduit } from 'app/shared/model/produit.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProduitDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProduitDetail extends React.Component<IProduitDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { produitEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Produit [<b>{produitEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="nom">Nom</span>
            </dt>
            <dd>{produitEntity.nom}</dd>
            <dt>
              <span id="quantite">Quantite</span>
            </dt>
            <dd>{produitEntity.quantite}</dd>
            <dt>
              <span id="prix">Prix</span>
            </dt>
            <dd>{produitEntity.prix}</dd>
          </dl>
          <Button tag={Link} to="/entity/produit" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/produit/${produitEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ produit }: IRootState) => ({
  produitEntity: produit.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProduitDetail);
