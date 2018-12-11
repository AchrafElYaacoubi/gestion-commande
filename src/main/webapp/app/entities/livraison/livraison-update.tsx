import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICommande } from 'app/shared/model/commande.model';
import { getEntities as getCommandes } from 'app/entities/commande/commande.reducer';
import { getEntity, updateEntity, createEntity, reset } from './livraison.reducer';
import { ILivraison } from 'app/shared/model/livraison.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILivraisonUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ILivraisonUpdateState {
  isNew: boolean;
  commandeId: string;
}

export class LivraisonUpdate extends React.Component<ILivraisonUpdateProps, ILivraisonUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      commandeId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCommandes();
  }

  saveEntity = (event, errors, values) => {
    values.date = new Date(values.date);

    if (errors.length === 0) {
      const { livraisonEntity } = this.props;
      const entity = {
        ...livraisonEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/livraison');
  };

  render() {
    const { livraisonEntity, commandes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="gestionCommandeApp.livraison.home.createOrEditLabel">Create or edit a Livraison</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : livraisonEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">ID</Label>
                    <AvInput id="livraison-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    Date
                  </Label>
                  <AvInput
                    id="livraison-date"
                    type="datetime-local"
                    className="form-control"
                    name="date"
                    value={isNew ? null : convertDateTimeFromServer(this.props.livraisonEntity.date)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="commande.date">Commande</Label>
                  <AvInput id="livraison-commande" type="select" className="form-control" name="commande.id">
                    <option value="" key="0" />
                    {commandes
                      ? commandes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.date}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/livraison" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />&nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  commandes: storeState.commande.entities,
  livraisonEntity: storeState.livraison.entity,
  loading: storeState.livraison.loading,
  updating: storeState.livraison.updating,
  updateSuccess: storeState.livraison.updateSuccess
});

const mapDispatchToProps = {
  getCommandes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LivraisonUpdate);
