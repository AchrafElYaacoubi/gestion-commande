import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './facture.reducer';
import { IFacture } from 'app/shared/model/facture.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFactureDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class FactureDetail extends React.Component<IFactureDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { factureEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Facture [<b>{factureEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="date">Date</span>
            </dt>
            <dd>
              <TextFormat value={factureEntity.date} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="montant">Montant</span>
            </dt>
            <dd>{factureEntity.montant}</dd>
            <dt>Commande</dt>
            <dd>{factureEntity.commande ? factureEntity.commande.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/facture" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>&nbsp;
          <Button tag={Link} to={`/entity/facture/${factureEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ facture }: IRootState) => ({
  factureEntity: facture.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FactureDetail);
