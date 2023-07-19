import React, { useEffect, useMemo, useState } from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  OrderedList,
  UnorderedList,
  ListItem,
  Link,
  useTheme,
  Button,
  Spacer,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Flex,
} from '@chakra-ui/react';
import { FiInfo, FiX } from 'react-icons/fi';
import Joyride, { CallBackProps, STATUS, Step, ACTIONS, TooltipRenderProps } from 'react-joyride';
import { useSession } from '@roq/nextjs';
import { appConfig } from 'config';

interface State {
  run: boolean;
  steps: Step[];
}

function Tooltip(props: TooltipRenderProps) {
  const { backProps, continuous, index, isLastStep, primaryProps, skipProps, step, tooltipProps, closeProps } = props;
  return (
    <Box maxW="md" {...tooltipProps}>
      <Card align="center">
        <CardHeader p="4" w="100%">
          <Flex alignItems={'center'} justifyContent="space-between">
            <Heading size="md">{step.title}</Heading>
            <IconButton {...closeProps} icon={<FiX />} />
          </Flex>
        </CardHeader>
        <CardBody>{step.content}</CardBody>
        <CardFooter w="100%">
          <Flex w="100%" justify={'space-between'}>
            <Button
              {...backProps}
              bg={'cyan.500'}
              _hover={{
                bg: 'cyan.700',
              }}
              alignSelf="flex-end"
              colorScheme="blue"
            >
              {index === 0 ? 'EXIT' : 'BACK'}
            </Button>
            <Button
              {...primaryProps}
              bg={'cyan.500'}
              _hover={{
                bg: 'cyan.700',
              }}
              alignSelf="flex-end"
              colorScheme="blue"
            >
              {isLastStep ? 'DONE' : 'NEXT'}
            </Button>
          </Flex>
        </CardFooter>
      </Card>
    </Box>
  );
}

function isFirstLogin() {
  const firstTimeLogin = !localStorage.getItem('userHasLoggedIn');
  if (firstTimeLogin) {
    localStorage.setItem('userHasLoggedIn', 'true');
    return false;
  } else {
    return true;
  }
}

function isFirstVisit() {
  const firstTimeLogin = !localStorage.getItem('userFirstVisit');
  if (firstTimeLogin) {
    localStorage.setItem('userFirstVisit', 'true');
    return false;
  } else {
    return true;
  }
}

export const HelpBox: React.FC = () => {
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const { ownerRoles, customerRoles, tenantRoles, applicationName, tenantName, addOns } = appConfig;
  const theme = useTheme();
  const { session, status: sessionStatus } = useSession();
  const steps = useMemo<Step[]>(
    () =>
      !Boolean(session?.roqUserId)
        ? [
            {
              title: (
                <Text textAlign={'center'}>{`🎉 Welcome Aboard ${applicationName}, Your New App Adventure!`}</Text>
              ),
              content: (
                <Box>
                  <Text mb="4">
                    We briefly guide you through your app and how it can help you building your next project
                  </Text>
                  <OrderedList mb="4">
                    <ListItem>You received access to the codebase via email and Github invitation.</ListItem>
                    <ListItem>
                      Questions? In our{' '}
                      <Link
                        href="https://join.slack.com/t/roq-community/shared_invite/zt-1ly20yqpg-K03kNGxN1C7G1C0rr3TlSQ"
                        isExternal
                        color="teal.500"
                      >
                        Community Slack
                      </Link>{' '}
                      you can talk to our team and other users.
                    </ListItem>
                    <ListItem>You can revisit this guide by clicking the icon on the bottom left.</ListItem>
                  </OrderedList>
                  <Text>Let’s start!</Text>
                  <Text>P.S: To disable this tutorial, just set the NEXT_PUBLIC_SHOW_BRIEFING env variable.</Text>
                </Box>
              ),
              placement: 'center',
              target: 'body',
            },
            {
              title: <Text>{`Let’s get started!`}</Text>,
              content: (
                <Box>
                  <Text mb="2">{`You've crafted a multi-tenancy application with two unique customer types:`}</Text>
                  {customerRoles.length > 0 && (
                    <Box mb="2">
                      <Text>{`🏠 Owner`}</Text>
                      <Text>{`👥 Customer`}</Text>
                    </Box>
                  )}
                  <Text>{`👉 Let's go: Please create an account to continue this guide within your app. Can't wait to see you there!`}</Text>
                </Box>
              ),
              target: '.roles-container',
            },
          ]
        : ([
            {
              title: <Text>{`Voilà, Your Personal Data Model!`}</Text>,
              placement: 'right-end',
              content: (
                <Box>
                  <Text mb="2">{`Based on your inputs, we've build your individual data model. You find the main entities at the top of the menu.`}</Text>
                  <Text mb="2">Two highlights:</Text>
                  <OrderedList>
                    <ListItem>{`You have data tables and CRUD functionality on the subpages.`}</ListItem>
                    <ListItem>
                      {`Underneath the hood you have a `}{' '}
                      <Text as="span" fontWeight="bold">
                        powerful access managment
                      </Text>{' '}
                      {` – every user can only see the entries that match the user’s individual role and organization!`}
                    </ListItem>
                  </OrderedList>
                </Box>
              ),
              target: '.main-nav',
            },
            {
              title: <Text>{`👤 Meet Your User Profile!`}</Text>,
              placement: 'right-end',
              content: (
                <Box>
                  <Text mb="2">{`On the top right, you'll find the user profile functionality.`}</Text>
                  <Text>{`Here, both you and your users can manage their information, upload avatars, and much more. See how everything is working right from the start!`}</Text>
                </Box>
              ),
              target: '.layout-user-profile',
            },
            addOns.includes('notifications') && {
              title: <Text>{`🔔 Ring-a-ding, your notification center!`}</Text>,
              placement: 'right-end',
              content: (
                <Box>
                  <Text
                    mb={'2'}
                  >{`Here lies your ready-to-go notification feature. It's set up for in-app alerts right out of the box!`}</Text>
                  <Text>{`Feel free to add new notification types and channels (like SMS, Emails, ..) or even more in-app alerts. In the our documentation you find more details on how this works.`}</Text>
                </Box>
              ),
              target: '.layout-notification-bell',
            },
            {
              title: <Text>{`🚀 More pre-loaded features`}</Text>,
              content: (
                <Box>
                  <Text mb="2">{`ROQ brings more features out of the box. Here, you and your users can:`}</Text>
                  <UnorderedList mb="2">
                    <ListItem>{`Send a warm invite to new users to join your organization.`}</ListItem>
                    <ListItem>{`Start a chat with other users (you’ll need to add the part to limit who can chat with whom)`}</ListItem>
                  </UnorderedList>
                  <Text>{`You will find much info on how to leverage this for your project in the documentation! `}</Text>
                </Box>
              ),
              placement: 'right-end',
              target: '.secondary-nav',
            },
          ].filter(Boolean) as Step[]),
    [session?.roqUserId],
  );

  const [run, setRun] = useState(false);
  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, action, index } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }

    // User pressed back on the first step
    if ((status === STATUS.RUNNING || status === STATUS.READY) && action === ACTIONS.PREV && index === 0) {
      setRun(false); // This will close the Joyride
    }
  };

  const handleClickStart = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setRun(true);
  };

  useEffect(() => {
    if (session?.roqUserId) {
      if (!isFirstLogin()) {
        setRun(true);
      }
    } else {
      if (!isFirstVisit()) {
        setRun(true);
      }
    }
  }, [session?.roqUserId]);

  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  if (sessionStatus === 'loading') {
    return null;
  }

  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <IconButton
        onClick={handleClickStart}
        aria-label="Help Info"
        icon={<FiInfo />}
        bg="blue.800"
        color="white"
        _hover={{ bg: 'blue.800' }}
        _active={{ bg: 'blue.800' }}
        _focus={{ bg: 'blue.800' }}
      />
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideCloseButton
        run={run}
        scrollToFirstStep
        steps={steps}
        tooltipComponent={Tooltip}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
    </Box>
  );
};
