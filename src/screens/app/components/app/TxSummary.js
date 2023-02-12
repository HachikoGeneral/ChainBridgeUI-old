import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Card } from 'antd';

class TxSummary extends Component {

  getEtherscanLink = () => {
    const { network, eventEvent } = this.props.txData;
    const { transactionHash } = eventEvent;
    let url;
    if (network === 'chikochain') {
      url = `http://95.179.194.226:3000/?rpc=ws%3A%2F%2F70.34.216.42%3A9944#/explorer/tx/${transactionHash}`;
    } else if (network === 'polygon') {
      url = `https://polygonscan.io/tx/${transactionHash}`;
    }  
    return url;
  };

  render() {
    const { eventEvent, chikochainRecipient, network  } = this.props.txData;
    const { address, blockHash, blockNumber, data, event, eventSignature, topics, transactionHash, transactionIndex } = eventEvent;
    return (
      <div>
        <Row>
          <Col>
            <Card style={cardContainer}>
              <div style={textContainer}>   
                <p style={titleStyles}> Withdraw Contract Event: {network} </p> 
                <p style={headerStyles}>Goerli Reciept </p> 
                <p style={dataStyles}>{goerliRecipient} </p>
              </div>           
            </Card>
          </Col>           
        </Row>
        <Row>
          <Col>
            <Card style={cardContainer}>
              <div style={textContainer}>
                <p style={titleStyles}> Deposit Contract Event: {network} </p> 
                <p style={headerStyles}>Address: </p> 
                <p style={dataStyles}>{address} </p> 
                <p style={headerStyles}>Block Hash: </p> 
                <p style={dataStyles}>{blockHash} </p> 
                <p style={headerStyles}>Block Number </p> 
                <p style={dataStyles}> {blockNumber} </p> 
                <p style={headerStyles}>Data: </p> 
                <p style={dataStyles}>{data} </p> 
                <p style={headerStyles}>Event Type: </p> 
                <p style={dataStyles}>{event} </p> 
                <p style={headerStyles}>Event Signature: </p> 
                <p style={dataStyles}>{eventSignature} </p> 
                <p style={headerStyles}>Topics </p> 
                <p style={dataStyles}> {topics} </p>
                <p style={headerStyles}>Transaction Hash: </p>
                <p style={dataStyles}> <a href={this.getEtherscanLink()}> {transactionHash} </a> </p> 
                <p style={headerStyles}>Transaction Index: </p> 
                <p style={dataStyles}>{transactionIndex} </p> 
              </div>           
            </Card>
          </Col>           
        </Row>
      </div>
    );
  }
}

const textContainer = {
  overflow: 'hidden',
};

const cardContainer = {
  width: '90%',
  margin: '0 auto',
};

const titleStyles = {
  fontSize: '1.5em',
  fontWeight: '500',
  color: '#AFA392',
};

const headerStyles = {
  fontSize: '1.3em',
  fontWeight: '500',
  color: '#AFA392',
};

const dataStyles = {
  fontSize: '1.1em',
  fontWeight: '300',
  color: '#AFA392',
}

export default TxSummary;
