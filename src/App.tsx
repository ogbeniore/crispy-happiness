import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from 'react';
import './App.css';
import ProjectPhase from './components/ProjectStage';
import CustomInput from './components/Input';
import { IPhase } from './types/project-phase';
import { ISteps } from './types/steps';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const defaultProject: IPhase[] = [
    {
      id: 1,
      name: 'Foundation',
      isDone: false,
      steps: [
        {
          id: 1,
          name: 'Setup virtual Office',
          isComplete: false
        }
      ]
    }
  ]
  const [project, setProject] = useState(defaultProject)
  const [phaseName, setPhaseName] = useState('')
  const [showForm, setShowForm] = useState<boolean>(false);
  const [localProject, setLocalProject] = useLocalStorage('project', defaultProject)

  const markStepAsComplete = (stepId: number, phaseId: number) => {

    const updatedProject = project.map(phase => {
      if (phase.id === phaseId) {
        // Update the completed steps
        let steps = phase?.steps.map(step => step.id === stepId ?  {...step, isComplete: !step.isComplete} : step)
        // Evaluate the Done status
        let isDone = steps.filter(step => step.isComplete).length === steps.length

        return {
          ...phase, steps, isDone
        }
      } 
      return phase;
    })

    setProject(updatedProject)
  }

  const handleAddStep = (step: string, phaseId: number) => {
    const updatedProject = [...project];
    const currentPhase = project.find((phase: IPhase) => phase.id === phaseId);
    const currentPhaseIndex = project.findIndex((phase: IPhase) => phase.id === phaseId);

    if(currentPhase) {
      const newStep: ISteps = {
        id: currentPhase.steps.length + 1,
        name: step,
        isComplete: false
      }
      currentPhase.steps.push(newStep);
      currentPhase.isDone = false;
      updatedProject[currentPhaseIndex] = currentPhase;

      setProject(updatedProject);
    } else {
      alert('Error adding step to phase');
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target?.value) {
      setPhaseName(e.target.value)
    }
  }

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addPhase()
    }
  }

  const addPhase = () => {

    if (phaseName) {
      const newPhase: IPhase = {
        id: project.length + 1,
        name: phaseName,
        isDone: false,
        steps: []
      }
  
      setProject([...project, newPhase])
      setPhaseName('')
      setShowForm(false)
    }

  }

  // 
  useEffect(() => {
    setProject(localProject)
  }, [])

  useEffect(() => {
    setLocalProject(project)
  }, [project])


  return (
    <div className="App">
      <header className="App-header">
        <h1>Startup progress tracker</h1>
      </header>

      <div className="main-container">
        {project.map((phase: IPhase) => 
          <ProjectPhase 
            markComplete={(stepId) => markStepAsComplete(stepId, phase.id)} 
            addStep={(step: string) => handleAddStep(step, phase.id)}
            phase={phase} 
            key={phase.id}/>)}

        {showForm ? <CustomInput
          onChange={handleInputChange}
          onKeyDown={handleEnterKey} />
          :
        <button
          className="project-phase__step-button"
          onClick={() => setShowForm(!showForm)}>
          Add Phase
        </button>}
      </div>
    </div>
  );
}

export default App;
