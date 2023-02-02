import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { IPhase } from "../types/project-phase";
import CustomInput from "./Input";


interface ProjectPhaseProps {
    phase: IPhase;
    markComplete: (id: number) => void;
    addStep: (step: string) => void
}

const ProjectPhase = ({ phase, markComplete, addStep } : ProjectPhaseProps) => {

    const [newStep, setNewStep] = useState<string>('');
    const [showForm, setShowForm] = useState<boolean>(false);

    const addNewStep = () => {
        if(showForm) {
            addStep(newStep);
            setNewStep('');
            setShowForm(false);
        } else {
            setShowForm(true);
        }
    }
    

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(e.target?.value) {
            setNewStep(e.target.value)
        }
    }

    const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            addNewStep()
        }
    }

    return (
        <div className="project-phase">
        <div className={phase.isDone ? "project-phase__header done" : "project-phase__header"}>
            <h3>{phase.name}</h3>
        </div>
        <ul className="project-phase__steps">
            {phase?.steps.map( step => (
                <li 
                    className={step.isComplete ? "project-phase__step-item complete" : "project-phase__step-item"}
                    key={step.id}
                    onClick={() => markComplete(step.id)}>
                    {step.name}
                </li>
            ))}
            <li className="project-phase__step-item">
                {showForm && 
                    <CustomInput
                        onChange={handleInputChange}
                        onKeyDown={handleEnterKey}/>}
                <button
                    className="project-phase__step-button"
                    onClick={addNewStep}>
                        Add step
                </button>
            </li>
        </ul>
    </div>
)}
export default ProjectPhase;
