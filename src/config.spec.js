import config from './config';

chai.should();

describe('Config Spec', () => {

  beforeEach(() => {
    config.setApiEnv('prod');
  });

  it('should set the api env', () => {
    config.setApiEnv('te1');
    const api = config.getApiUrl();

    api.should.eql('http://m-dt-test1.jcpenney.com');
  });

  it('should not set the api env when the choice is invalid', () => {
    config.setApiEnv('asdf');
    const api = config.getApiUrl();

    api.should.eql('http://m.jcpenney.com');
  })
});
