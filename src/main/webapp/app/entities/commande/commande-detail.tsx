import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './commande.reducer';
import { ICommande } from 'app/shared/model/commande.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommandeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CommandeDetail extends React.Component<ICommandeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { commandeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Commande [<b>{commandeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">Date</span>
            </dt>
            <dd>
              <TextFormat value={commandeEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Produit</dt>
            <dd>
              {commandeEntity.produits
                ? commandeEntity.produits.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.nom}</a>
                      {i === commandeEntity.produits.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Client</dt>
            <dd>{commandeEntity.client ? commandeEntity.client.nom : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/commande" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/commande/${commandeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ commande }: IRootState) => ({
  commandeEntity: commande.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommandeDetail);
