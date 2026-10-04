const protobuf = require('protobufjs');
const path = require('path');

// Load protobuf definitions
let bridge;

async function loadProto() {
  try {
    bridge = await protobuf.load(path.join(__dirname, '../proto/bridge.proto'));
  } catch (e) {
    console.log('Using default bridge definition');
    // Basic bridge structure for routing
    bridge = {
      lookupType: (name) => {
        return { encode: (obj) => Buffer.from(JSON.stringify(obj)), decode: (buf) => JSON.parse(buf.toString()) };
      }
    };
  }
}

module.exports = async function(req, res) {
  const contentType = req.headers['content-type'] || '';
  
  // Read protobuf message type from header
  const messageType = req.headers['x-frever-message-type'] || 'default';
  
  // Decode request
  let requestData;
  try {
    if (contentType.includes('application/octet-stream')) {
      // Protobuf binary format
      const Root = protobuf.loadSync(path.join(__dirname, '../proto/bridge.proto'));
      const Message = Root.lookupType(messageType);
      if (Message) {
        requestData = Message.decode(req.body);
      } else {
        requestData = JSON.parse(req.body.toString());
      }
    } else {
      requestData = req.body;
    }
  } catch (e) {
    console.error('Decode error:', e.message);
    requestData = req.body;
  }
  
  // Route based on message type
  const route = messageType.split('.')[0]?.toLowerCase() || 'misc';
  const handler = require('./routes/' + route + '.js');
  
  try {
    const response = await handler(requestData, req);
    
    // Encode response as protobuf
    res.set('Content-Type', 'application/octet-stream');
    if (contentType.includes('application/octet-stream')) {
      res.send(JSON.stringify(response));
    } else {
      res.json(response);
    }
  } catch (e) {
    console.error('Handler error:', e);
    res.status(500).json({ error: e.message });
  }
};

loadProto();