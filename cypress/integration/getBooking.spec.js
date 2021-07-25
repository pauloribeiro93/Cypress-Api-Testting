/// <reference types="cypress" />

import req from '../support/api/request'
import schemas from '../support/api/schemas'
import assertions from '../support/api/assertions'

context('booking', () => {
    before(() => {
        req.doAuth()
    });
    it('Validar o contrato do GET Booking @contract', () => {
        req.getBooking()
            .then(getBookingResponse => {
                assertions.
                    validadteContatactOf(getBookingResponse, schemas.getBookingSchema())

            })
    });

    it('Criar uma reserva com sucesso! @functional', () => {

        req.postBooking().then(postBookingResponse => {
            assertions.shouldHaveStatus(postBookingResponse, 200)
            assertions.shouldBookingIdIsNotNull(postBookingResponse)
            assertions.shouldHaveDefaultHeaders(postBookingResponse)
            assertions.shouldHaveContentTypeAppjson(postBookingResponse)
            assertions.shouldDurationsBefast(postBookingResponse)
        })

    });

    it('Tentar alterar reserva sem Token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithoutToken(postBookingResponse)
                .then(putBookingResponse => {
                    assertions.shouldHaveStatus(putBookingResponse, 403)

                })
        })

    });

    it('Alterar unma reserva com sucesso! @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse)
                .then(putBookingResponse => {
                    assertions.shouldHaveStatus(putBookingResponse, 200)

                })
        })
        
    });


    it('Remover uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse)
                .then(deleteBookingResponse => {
                    assertions.shouldHaveStatus(deleteBookingResponse, 201)

                })
        })
        
    });
});

