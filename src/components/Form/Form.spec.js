import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import FormService from './';

chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('<FormService />', () => {
  let sut;

  beforeEach(() => {
    sut = shallow(<FormService />);
  });

  it('should exist', () => {
    expect(sut).to.be.present;
  });
});
