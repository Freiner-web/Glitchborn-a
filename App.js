import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Linking,
} from 'react-native';

const App = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!message) return;
    setLoading(true);
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: message }],
        }),
      });
      const data = await res.json();
      const aiText = data.choices[0]?.message?.content;
      setResponse(aiText);
    } catch (error) {
      setResponse('❌ Error connecting to AI');
    }
    setLoading(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>👾 Glitchborn AI Helper</Text>
      <TextInput
        placeholder="Ask anything..."
        placeholderTextColor="#777"
        style={styles.input}
        onChangeText={setMessage}
        value={message}
      />
      <TouchableOpacity style={styles.button} onPress={askAI}>
        <Text style={styles.buttonText}>⚡ Ask AI</Text>
      </TouchableOpacity>
      {loading ? <Text style={styles.loading}>⏳ Thinking...</Text> : null}
      <Text style={styles.output}>{response}</Text>

      <View style={styles.divider} />
      <Text style={styles.subTitle}>🔥 Daily Checklist</Text>
      <Text style={styles.checkItem}>✅ Pick a trending clip</Text>
      <Text style={styles.checkItem}>✅ Add captions and sound</Text>
      <Text style={styles.checkItem}>✅ Post on TikTok + YouTube</Text>
      <Text style={styles.checkItem}>✅ Track views + repeat</Text>

      <View style={styles.divider} />
      <Text style={styles.subTitle}>🎬 Clip of the Day</Text>
      <Image
        source={{ uri: 'https://i.ytimg.com/vi/JNXYH8KMX08/hqdefault.jpg' }}
        style={styles.thumbnail}
      />
      <TouchableOpacity onPress={() => Linking.openURL('https://youtu.be/JNXYH8KMX08')}>
        <Text style={styles.link}>▶️ Watch Clip</Text>
      </TouchableOpacity>

      <View style={styles.divider} />
      <Text style={styles.subTitle}>🎵 Suggested Sounds</Text>
      <Text style={styles.checkItem}>🎧 Goofy Ahh Sound Effect #3</Text>
      <Text style={styles.checkItem}>💥 Vine Boom Explosion</Text>

      <View style={styles.divider} />
      <Text style={styles.subTitle}>✂️ Editing Tips</Text>
      <Text style={styles.checkItem}>– Use impact frame first</Text>
      <Text style={styles.checkItem}>– Zoom and caption pop</Text>
      <Text style={styles.checkItem}>– End with meme twist</Text>

      <View style={styles.divider} />
      <Text style={styles.subTitle}>💰 Support Creator</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL('https://ko-fi.com/nexusai12')}
      >
        <Text style={styles.buttonText}>☕ Support on Ko-fi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL('https://paypal.me/ProsperPophiwa')}
      >
        <Text style={styles.buttonText}>💸 Donate via PayPal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0d0d0d',
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#8a2be2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  output: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  loading: {
    color: '#bbb',
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 20,
  },
  subTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  checkItem: {
    color: '#aaa',
    fontSize: 16,
    marginBottom: 4,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 6,
  },
  link: {
    color: '#1e90ff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
