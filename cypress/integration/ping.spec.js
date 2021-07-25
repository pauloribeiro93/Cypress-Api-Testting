/// <reference types="cypress" />

import req from '../support/api/request'
import assertions from '../support/api/assertions'

context('Ping', () => {
    it('Validar aplicação se está no Ar! @healthcheck', () => {
        req.getPing().then((res) => {
            assertions.shouldHaveStatus(res, 201)
        })
    });
});

