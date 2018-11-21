// @flow

import * as React from 'react';
import {Component} from 'react-simplified';
import {Alert, Button} from '../src/widgets.js';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';
import {PostCard} from "../src/components/post/post";
import {CommentCard} from '../src/components/comment/comment';
import {EditPost} from '../src/components/editpost/editpost';

/*
import chai, {expect} from 'chai';
import sinonChai from 'sinon-chai';
*/

//chai.use(sinonChai);


describe('Test for PostCard component feed version', () => {
    let wrapper, post_id = 1, title = 'Test title', picture = 'Test picture', picture_text = 'Test picture text',
        date_created = 'Test date';

    beforeEach(() => {
        wrapper = shallow(<PostCard post_id={post_id} title={title} picture={picture} picture_text={picture_text}
                                    date_created={date_created}/>)
    });

    it('testing title value', () => {
        expect(wrapper.find('#title2').text()).toEqual('Test title');
    });

    it('testing picture value', () => {
        expect(wrapper.find('#picture2').prop('src')).toEqual('Test picture');
    });

    it('testing picture_text value', () => {
        expect(wrapper.find('#picture2').prop('alt')).toEqual('Test picture text');
    });

    it('testing article link value', () => {
        expect(wrapper.find('#postLink').prop('to')).toEqual('/posts/1');
    });

});

describe('Test for PostCard component article version', () => {
    let wrapper, post_id = 1, title = 'Test title', text = 'Test text', picture = 'Test picture',
        picture_text = 'Test picture text', date_created = 'Test date';

    beforeEach(() => {
        wrapper = shallow(<PostCard post_id={post_id} title={title} text={text} picture={picture}
                                    picture_text={picture_text} date_created={date_created} comments={[]}/>)
    });

    it('testing title value', () => {
        expect(wrapper.find('#title').text()).toEqual('Test title');
    });

    it('testing text value', () => {
        expect(wrapper.find('#text').text()).toEqual('Test text');
    });

    it('testing picture value', () => {
        expect(wrapper.find('#picture').prop('src')).toEqual('Test picture');
    });

    it('testing picture_text value', () => {
        expect(wrapper.find('#picture').prop('alt')).toEqual('Test picture text');
    });

    it('testing date value', () => {
        expect(wrapper.find('#date').text()).toEqual('Published: Test date');
    });

});

describe('Test for CommentCard component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<CommentCard commenter="Magnus" text="Hallo" comment_date="test date"/>)
    });

    it('testing commenter value', () => {
        expect(wrapper.find('#commenter').text()).toEqual('Magnus');
    });

    it('testing date value', () => {
        expect(wrapper.find('#text').text()).toEqual('Hallo');
    });

    it('testing date value', () => {
        expect(wrapper.find('#comment_date').text()).toEqual('commented: test date');
    });
});

describe('Test for Button component', () => {
    let wrapper, buttonType, buttonSpy, children;
    beforeEach(() => {
        buttonType = 'danger';
        buttonSpy = spy();
        children = 'clickMe';
        wrapper = shallow(<Button id="button" type={buttonType} onClick={() => buttonSpy}>children</Button>);
    });

    it('Testing clicking button', () => {
        wrapper.find('button').simulate('click');
        expect(buttonSpy.called);
    });
});

describe('Alert tests', () => {
    const wrapper = shallow(<Alert/>);

    it('initially', () => {
        let instance: ?Alert = Alert.instance();
        expect(typeof instance).toEqual('object');
        if (instance) expect(instance.alerts).toEqual([]);

        expect(wrapper.find('button.close')).toHaveLength(0);
    });

    it('after danger', done => {
        Alert.danger('test');

        setTimeout(() => {
            let instance: ?Alert = Alert.instance();
            expect(typeof instance).toEqual('object');
            if (instance) expect(instance.alerts).toEqual([{text: 'test', type: 'danger'}]);

            expect(wrapper.find('button.close')).toHaveLength(1);

            done();
        });
    });

    it('after clicking close button', () => {
        wrapper.find('button.close').simulate('click');

        let instance: ?Alert = Alert.instance();
        expect(typeof instance).toEqual('object');
        if (instance) expect(instance.alerts).toEqual([]);

        expect(wrapper.find('button.close')).toHaveLength(0);
    });
});
