import AccountList from './account/AccountList';
import React from 'react';
import { createMount  } from '@material-ui/core/test-utils';

describe('App', () => {
  let mount, wrapper;
  beforeEach(() => {
   mount = createMount();
   wrapper = mount(<AccountList />);
  });

  it('should not contains an error', () => {
    const error = wrapper.containsMatchingElement(".errorContainer");
    expect(error).toBe(false);
  });

  it('should have default value EUR', () => {
    const item = 'EUR';
    const toggleTitle = wrapper.find("input").find('.MuiSelect-nativeInput').props().value;
    expect(toggleTitle).toEqual(item);
  });

});