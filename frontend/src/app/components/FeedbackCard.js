import React from 'react'
import { Button, Card } from 'react-bootstrap'

export default function FeedbackCard() {
    return (
        <>
            <Card className="card card-custom gutter-b bg-secondary">
            <Card.Body className="card-body">
              <div className="d-flex align-items-center justify-content-between p-4 flex-lg-wrap flex-xl-nowrap">
                <div className="d-flex flex-column mr-5">
                  <h4 className="text-dark text-hover-primary mb-5">Get In Touch</h4>
                  <p className="text-dark-50">
                    Your feedback is always welcome to improve this application
                  </p>
                </div>
                <div className="ml-6 ml-lg-0 ml-xxl-6 flex-shrink-0">
                  <Button
                    href="/"
                    className="btn font-weight-bolder text-uppercase btn-info py-4 px-6"
                  >
                    Support
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </>
    )
}
