import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { Button, Card, Paragraph, Text, FAB } from "react-native-paper";

type Post = {
  id: number;
  title: string;
  description: string;
  author: string;
  comments: number;
};

const initialPosts: Post[] = [
  {
    id: 1,
    title: "Joey Tribbiani",
    description:
      "We're organizing a food drive to support families affected by the disaster. Please donate non-perishable items at the community center.",
    author: "John Doe",
    comments: 15,
  },
  {
    id: 2,
    title: "Ross Geller",
    description:
      "If anyone needs shelter or knows someone who does, please reach out! We have a safe space available for those in need.",
    author: "Jane Smith",
    comments: 10,
  },
  {
    id: 3,
    title: "Rachel Green",
    description:
      "Medical supplies are running low at the local clinic. Please help by donating any first aid items or medications you can spare.",
    author: "Dr. Emily",
    comments: 30,
  },
];

const CommunityPosts = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  // Function to handle comments button press
  const handleCommentsPress = (title: string) => {
    Alert.alert(`Comments for: ${title}`, "Navigating to comments...");
  };

  return (
    <>
      <ScrollView style={styles.content}>
        {posts.map((post) => (
          <Card
            key={post.id}
            style={styles.card}
          >
            <View style={styles.cardContent}>
              {/* Post Content */}
              <View style={styles.postContent}>
                <Card.Title
                  title={post.title}
                  titleVariant="bodyMedium"
                  titleStyle={{ fontWeight: "bold" }}
                  subtitle="Sep 27 at 3:30 pm"
                  subtitleStyle={{ paddingBottom: 12, color: "#7b7b7b" }}
                />
                <Card.Content>
                  <Paragraph style={{ color: "#7b7b7b", marginTop: -10 }}>
                    {post.description}
                  </Paragraph>
                </Card.Content>
                <View style={styles.postActions}>
                  <Button
                    icon="comment"
                    labelStyle={styles.buttonLabel}
                    onPress={() => handleCommentsPress(post.title)}
                  >
                    {post.comments} Comments
                  </Button>
                </View>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </>
  );
};

const NewsFeed = () => (
  <View style={styles.content}>
    <Text>News Feed will appear here.</Text>
  </View>
);

const Updates = () => {
  const [activeTab, setActiveTab] = useState<"community" | "news">("community");

  // Function to handle creating a new post
  const handleNewPost = () => {
    Alert.alert("Create New Post", "Navigating to the new post screen...");
  };

  return (
    <View style={styles.container}>
      {/* Tab Buttons */}
      <View style={styles.tabContainer}>
        <Button
          mode={activeTab === "community" ? "contained" : "outlined"}
          onPress={() => setActiveTab("community")}
          style={{
            ...styles.tabButton,
            backgroundColor: activeTab === "community" ? "#FFB248" : undefined,
          }}
          labelStyle={{ color: activeTab === "community" ? "white" : "black" }}
          contentStyle={{ paddingVertical: 4 }}
        >
          Community Posts
        </Button>
        <Button
          mode={activeTab === "news" ? "contained" : "outlined"}
          onPress={() => setActiveTab("news")}
          style={{
            ...styles.tabButton,
            backgroundColor: activeTab === "news" ? "#FFB248" : undefined,
          }}
          labelStyle={{ color: activeTab === "news" ? "white" : "black" }}
          contentStyle={{ paddingVertical: 4 }}
        >
          News Feed
        </Button>
      </View>

      {/* Content Based on Active Tab */}
      {activeTab === "community" ? <CommunityPosts /> : <NewsFeed />}

      {/* Floating Action Button */}
      <FAB
        style={styles.fab}
        icon="plus"
        label=""
        onPress={handleNewPost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderRadius: 5,
    backgroundColor: "white",
    shadowOpacity: 0.0001,
    shadowColor: "#ddd",
    marginBottom: 15,
  },
  cardContent: {
    flexDirection: "row",
    padding: 10,
  },
  postContent: {
    flex: 1,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonLabel: {
    fontSize: 12,
    color: "#FFB248",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 10,
    backgroundColor: "#FFB248",
    borderRadius: 100,
  },
});

export default Updates;
