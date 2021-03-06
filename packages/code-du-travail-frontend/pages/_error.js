import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Section, theme } from "@socialgouv/react-ui";
import { Layout } from "../src/layout/Layout";
import { initializeSentry, notifySentry } from "../src/sentry";

initializeSentry();

export default class Error extends React.Component {
  static async getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode, message: err.message };
  }

  componentDidMount() {
    const { statusCode, message } = this.props;
    if (statusCode && statusCode >= 400) {
      notifySentry(statusCode, message);
    }
  }

  render() {
    const { statusCode } = this.props;
    return (
      <Layout>
        <Section>
          <FlexCenterer>
            <P>
              {this.props.statusCode
                ? `Une erreur ${statusCode} est apparue sur le serveur :/`
                : "Une erreur est apparue sur le client"}
              <br />
            </P>
            <Smaller>Notre équipe technique a été informée.</Smaller>
            <P>
              <Link href="/">
                <a>Retour à la page d’accueil</a>
              </Link>
            </P>
          </FlexCenterer>
        </Section>
      </Layout>
    );
  }
}

const { breakpoints, fonts } = theme;

const FlexCenterer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(90vh - 15rem);
  text-align: center;
`;

const P = styled.p`
  font-size: ${fonts.sizes.headings.large};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.headings.medium};
  }
`;

const Smaller = styled.p`
  font-size: ${fonts.sizes.headings.small};
  @media (max-width: ${breakpoints.mobile}) {
    font-size: ${fonts.sizes.default};
  }
`;
