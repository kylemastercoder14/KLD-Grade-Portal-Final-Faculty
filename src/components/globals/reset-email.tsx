import {
    Body,
    Container,
    Column,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    render,
    Row,
  } from "@react-email/components";
  import * as React from "react";
  
  interface ResetEmailProps {
    name: string;
    teacherId: string;
  }
  
  export const ResetEmail = ({
    name,
    teacherId,
  }: ResetEmailProps) => {
    return (
      <Html>
        <Head />
        <Preview>Reset Password - Kolehiyo ng Lungsod ng Dasmariñas</Preview>
        <Body style={main}>
          <Container style={container}>
            <Section>
              <Row>
                <Column>
                  <Img
                    src={`https://kld-grade-portal.s3.us-east-1.amazonaws.com/uploads/kld-logo.png`}
                    width="150"
                    height="150"
                    alt="Kolehiyo ng Lungsod ng Dasmariñas"
                  />
                </Column>
              </Row>
            </Section>
  
            <Section>
              <Hr style={hr} />
              <Text style={heading}>
                Kolehiyo ng Lungsod ng Dasmariñas - Grade Portal
              </Text>
              <Text style={paragraph}>Regal Day! {name},</Text>
              <Text style={paragraph}>
                Someone recently requested a password change for your account. If
                this was you, you can set a new password here:
              </Text>
              <Link
                style={button}
                href={`https://kld-grade-portal-final-faculty.vercel.app/new-password/${teacherId}`}
              >
                Reset Password
              </Link>
              <Text style={paragraph}>
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Hr style={hr} />
            </Section>
  
            <Section>
              <Text style={paragraph}>Thank you,</Text>
              <Text style={{ ...paragraph, fontSize: "20px" }}>
                The KLD Grades Portal Team
              </Text>
            </Section>
  
            <Section style={informationTable}>
              <Text style={informationTableDisclaimer}>
                DISCLAIMER: This email and any attachments are confidential and
                intended solely for the use of the named recipient(s). If you have
                received this email in error, please take immediate action to
                notify the Kolehiyo ng Lungsod ng Dasmariñas (KLD) by responding
                to the sender and deleting this email from your system. This email
                is not intended for distribution, copying, or sharing with any
                other party. Please be advised that any unauthorized
                dissemination, distribution, copying, or taking any action in
                reliance on the contents of this information is strictly
                prohibited. The views and opinions expressed in this email are
                those of the sender and do not necessarily reflect the views of
                KLD management and its personnel. By receiving this email, you
                acknowledge that you have read, understood, and will comply with
                the terms of this confidentiality notice.
              </Text>
            </Section>
  
            <Section>
              <Text style={footerCopyright}>
                Copyright © 2024 Kolehiyo ng Lungsod ng Dasmariñas. All rights
                reserved. <br />{" "}
                <Link
                  style={link}
                  href="https://www.facebook.com/kyleandre.lim29/"
                >
                  Developed By: Kyle Andre Lim
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    );
  };
  
  export const ResetEmailHTML = (props: ResetEmailProps) =>
    render(<ResetEmail {...props} />, {
      pretty: true,
    });
  
  const main = {
    backgroundColor: "#fff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "30px auto",
    backgroundColor: "#fff",
    borderRadius: 5,
    width: "660px",
    overflow: "hidden",
  };
  
  const heading = {
    fontSize: "14px",
    lineHeight: "26px",
    fontWeight: "700",
    color: "rgb(13, 42, 31)",
  };
  
  const informationTable = {
    borderCollapse: "collapse" as const,
    borderSpacing: "0px",
    color: "rgb(51,51,51)",
    backgroundColor: "rgb(250,250,250)",
    borderRadius: "3px",
    fontSize: "12px",
    marginTop: "12px",
  };
  
  const paragraph = {
    fontSize: "14px",
    lineHeight: "22px",
    color: "#3c4043",
  };
  
  const link = {
    ...paragraph,
    fontSize: "12px",
    color: "rgb(13, 42, 31)",
  };
  
  const button = {
    color: "#fff",
    borderRadius: 6,
    padding: "5px 10px",
    backgroundColor: "rgb(13, 42, 31)",
  };
  
  const hr = {
    borderColor: "#e8eaed",
    margin: "20px 0",
  };
  
  const informationTableDisclaimer = {
    fontSize: "12px",
    fontStyle: "italic",
    margin: "0",
    padding: "0",
    lineHeight: 1.4,
  };
  
  const footerCopyright = {
    margin: "25px 0 0 0",
    textAlign: "center" as const,
    fontSize: "12px",
    color: "rgb(102,102,102)",
  };