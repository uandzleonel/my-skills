import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList
} from 'react-native'

import { Button } from '../components/Button'
import { SkillCard } from '../components/SkillCard'

interface SkillData {
  id: string;
  name: string;
}

export function Home(){
  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState<SkillData[]>([])
  const [greeting, setGreeting] = useState('')

  const handleAddNewSkill = () => {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills(oldState => [...oldState, data])
  }

  const handleRemoveSkill = (id: string) => {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  useEffect(() => {
    const currentHour = (new Date).getHours();

    if( currentHour < 12 )
      setGreeting('Good morning')
    else if ( currentHour >= 12 && currentHour <= 18 )
      setGreeting('Good afternoon')
    else
      setGreeting('Good evening')
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome, Uanderson</Text>
      <Text style={styles.greeting}>{greeting}</Text>

      <TextInput
        style={styles.input}
        placeholder='New skill'
        placeholderTextColor='#555'
        onChangeText={setNewSkill}
      />

      <Button
        title='Add'
        onPress={handleAddNewSkill}
      />

      <Text style={[styles.title, { marginVertical: 50 }]}>My Skills</Text>

      {
        mySkills.length === 0
        ?
          <SkillCard skill={'No skills'} />
        :
          <FlatList
            showsVerticalScrollIndicator={false}
            data={mySkills}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <SkillCard
                skill={item.name}
                onPress={() => handleRemoveSkill(item.id)}
              />
            )}
          />
      }

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: '#121015'
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    marginTop: 30,
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    borderRadius: 8
  },
  greeting: {
    color: '#FFF'
  }
})
