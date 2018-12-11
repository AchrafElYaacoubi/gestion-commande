import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './livraison.reducer';
import { ILivraison } from 'app/shared/model/livraison.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILivraisonDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class LivraisonDetail extends React.Component<ILivraisonDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { livraisonEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Livraison [<b>{livraisonEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">Date</span>
            </dt>
            <dd>
              <TextFormat value={livraisonEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Commande</dt>
            <dd>{livraisonEntity.commande ? livraisonEntity.commande.date : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/livraison" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/livraison/${livraisonEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ livraison }: IRootState) => ({
  livraisonEntity: livraison.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LivraisonDetail);
