import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './livraison.reducer';
import { ILivraison } from 'app/shared/model/livraison.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILivraisonProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Livraison extends React.Component<ILivraisonProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { livraisonList, match } = this.props;
    return (
      <div>
        <h2 id="livraison-heading">
          Livraisons
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp; Create new Livraison
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Commande</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {livraisonList.map((livraison, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${livraison.id}`} color="link" size="sm">
                      {livraison.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={livraison.date} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{livraison.commande ? <Link to={`commande/${livraison.commande.id}`}>{livraison.commande.date}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${livraison.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${livraison.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${livraison.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ livraison }: IRootState) => ({
  livraisonList: livraison.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Livraison);
