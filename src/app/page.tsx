import {
  DownloadOutlined,
  FilterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Col, Flex, Row } from 'antd';
import Title from 'antd/es/typography/Title';

import { InfectionsCard } from '~/components/InfectionsCard';
import { VariantsCard } from '~/components/VariantsCard';
import { HydrateClient } from '~/trpc/server';

export default async function Home() {
  return (
    <HydrateClient>
      <Flex justify="space-between">
        <Title
          level={2}
          className="font-normal"
        >
          Page title
        </Title>
        <Flex gap={25}>
          <Button
            icon={<DownloadOutlined />}
            iconPosition="end"
          >
            Export to PDF
          </Button>
          <Button
            icon={<UnorderedListOutlined />}
            iconPosition="end"
          >
            Notes
          </Button>
          <Button
            icon={<FilterOutlined />}
            iconPosition="end"
          >
            Filter
          </Button>
        </Flex>
      </Flex>

      <Row gutter={24}>
        <Col span={12}>
          <InfectionsCard />
        </Col>
        <Col span={12}>
          <VariantsCard />
        </Col>
      </Row>
    </HydrateClient>
  );
}
