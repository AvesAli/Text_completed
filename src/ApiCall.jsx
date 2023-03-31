import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { Link } from "react-router-dom";

export default function ApiCall() {
  const [fetch, setFetch] = useState([]);
  const [player, setPlayer] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([])
  const [selectedTeam, setSelectedTeam] = useState("")
  const [selectedPlayerModal, setSelectedPlayerModal]  = useState({}) 
  const [playerModalOpen, setPlayerModalOpen] = useState(false)

  const apiFetch = async () => {
    const result = await axios
      .get("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((resp) => {
        const {teamsList}=resp.data

        setFetch(teamsList);
        setPlayer(resp.data.playerList)
      
      });
    return result;
  };
  const handleOpenModal = (selectedTeam)=> {
    const selectedTeamPlayers = player.filter((item)=> item.TID === selectedTeam.TID); 
    setSelectedPlayers(selectedTeamPlayers)
    setLgShow(true); 
    setSelectedTeam(selectedTeam.OfficialName)
    
  }
  useEffect(() => {
    apiFetch()
  }, []);
  const handleOpenPlayerModal = (playerObj) => {
    setPlayerModalOpen(true)
    setSelectedPlayerModal(playerObj)
    
  
  }
  
  console.log(selectedPlayers);
console.log(player);
  return (
    <div className="App">
     <Table striped>
      <thead >
        <tr >
         
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}}>Sr. No</th>
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}}>Team Name</th>
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}}>Short Name</th>
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}} > Team's Official Name</th>
        </tr>
      </thead>

      <tbody>
        {
          fetch.map((team, index)=>{
            return (

              <tr>
               
              <td>  {index + 1}</td>
              <td> <Button style={{color: "black", border: "none"}} variant="outline-light" onClick={()=>handleOpenModal(team)}>{team.WebName} </Button></td>
              <td>{team.ShortName}</td>
              <td>{team.OfficialName}</td>
            </tr>
            )
          })
        }
      </tbody>
     </Table>
     <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {selectedTeam}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped>
          <thead >
        <tr >
         
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}}>Sr. No</th>
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}}>Player Display Name</th>
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}}>Player Full Name</th>
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}} > Team</th>
        </tr>
      </thead>
      <tbody>
        {
          selectedPlayers.length > 0 ? (selectedPlayers.map((item, index)=>{
            return (

              <tr>
               
              <td>  {index + 1}</td>
              <td> <Button style={{color: "black", border: "none"}} variant="outline-light" onClick={()=>handleOpenPlayerModal(item)}>{item.PDName} </Button></td>
              <td>{item.PFName}</td>
              <td>{item.TOfflName}</td>
            </tr>
            )
          })) : "No Players Available"
        }
      </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    
     {/* ///////////////////////////////////////////////////////////////////// */}
     
     
     <Modal
        size="lg"
        show={playerModalOpen}
        onHide={() => setPlayerModalOpen(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Table striped>
        <thead >
        <tr >
         
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}}>Goal Score</th>
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}}>Skill</th>
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}}>Assist</th>
          <th style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid',width:'70px'}} > Trained</th>
        </tr>
      </thead>
<tbody>
  <tr>
    <td>{selectedPlayerModal.GS}</td>
    <td>{selectedPlayerModal.Skill}</td>
    <td>{selectedPlayerModal.Assist}</td>
    <td>{selectedPlayerModal.Trained}</td>
  </tr>
</tbody>
        </Table>
        </Modal.Body>
      </Modal>


    </div>
  );
}