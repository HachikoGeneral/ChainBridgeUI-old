import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './ContractForm.css';
import { Button, Row, Col, Card } from 'antd';
import FormInputText from '../inputs/FormInputText';

class ContractForm extends Component {

  state= {
    amount: 0,
    network: this.props.activeNetwork,
    errorMessage: null,
  };

  processInputs = async (resObj) => {
    const { error, data, type } = resObj;
    this.setState({ errorMessage: error, [type]: data  }, function () {
      console.log(this.state);
    });
  };

  execute = () => {
    const { amount } = this.state;
    this.props.extractData({amount});
  };

  render() {
    const { errorMessage, amount } = this.state;
    const hasError = errorMessage !== null;
    const formComplete = amount !== 0 && !hasError;
    return (
      <Row>
        <Col>
          <Card className="cardContainer">
            <div className="componentContainer">
              <div>
                {
                  hasError ? <p className="errorTxt">Error: {errorMessage} </p> : null
                }
              </div>
              <Row type="flex" justify="space-around" gutter={16} className="formContainer">
                <Col xs={24} sm={12} md={8} lg={8} span={4}>
                  <FormInputText isDisabled={false} type="amount" placeholderText="Amount" returnValue={this.processInputs} />
                </Col>           
                <Col xs={24} sm={12} md={8} span={4}>
                  <FormInputText isDisabled={true} placeholderText={this.props.activeNetwork} />
                </Col>
                <Col xs={24} sm={12} md={8} span={4}>
                  <Button 
                    disabled={!formComplete}
                    className="btn"
                    onClick={() => this.execute()} 
                    type= {!formComplete ? 'danger': 'primary'}
                    block>
                    Send to Bridge
                  </Button>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}


export default ContractForm;