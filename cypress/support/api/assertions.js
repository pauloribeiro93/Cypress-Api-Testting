class Assertions {

    shouldHaveStatus(response, status) {
        expect(response.status,`Status is ${status}`).to.eq(status)

    }
    
    validadteContatactOf(response, schema){
      return  cy.wrap(response.body).should(schema)
    }

    shouldBookingIdIsNotNull(response){
        return expect(response.body.bookingid, 'Booking exist').to.not.be.null
    }

    shouldHaveDefaultHeaders(response){
      return  expect(response.headers, 'default headers').to.include({
            server: 'Cowboy',
            connection: 'keep-alive',
            'x-powered-by': 'Express',

        })
    }
    shouldHaveContentTypeAppjson(response){
        expect(response.headers, 'content type').to.include({
            'content-type': 'application/json; charset=utf-8'
        })
    }

    shouldDurationsBefast(response){
        expect(response.duration, 'duration').lessThan(900)
    }


    requestHeadersTokenInvalido(response){
                expect(response.requestHeaders).to.include({
                        Cookie:"token=1nV41D0"
                    })

    }



    
}
export default new Assertions()