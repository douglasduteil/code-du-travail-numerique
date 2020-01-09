import React from "react";

import { Section } from "../../layout/Section";
import { Wrapper } from "../../layout/Wrapper";
import { Title } from ".";

export default {
  component: Title,
  title: "Titles|Components/Title"
};

export const base = () => (
  <>
    <Section>
      <Title subtitle="With a subtitle which can be very very long but this is quite an excuse I made up. Because I do loooove to talk. Yup.">
        This is a title (h2)
      </Title>
    </Section>
    <Section>
      <Wrapper variant="dark">
        <Title
          shift="2.4rem"
          subtitle="With a subtitle which can be very very long but this is quite an excuse I made up. Because I do loooove to talk. Yup."
        >
          This is a shifted title (h2)
        </Title>
      </Wrapper>
    </Section>
    <Section>
      <Title topStripped subtitle="With a basic subtitle">
        This is a top stripped title (h2)
      </Title>
    </Section>
  </>
);
