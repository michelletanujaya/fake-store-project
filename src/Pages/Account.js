import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { notEmpty } from '../utils';
import MissingPage from './MissingPage';

import { Dialog, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';

class Account extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        edit: false,
        account:{},
        warning: false
      };
    }

    componentDidMount(){
        const {account} = this.props;
        this.setState({account})
    }

    edit(){
        this.setState({edit: true})
    }

    save(){
        const {dispatch, account} = this.props;
        if(this.state.edit && !_.isEqual(this.state.account, account)){
            //dispatch to redux
            dispatch({ 
                type: 'EDIT ACCOUNT',
                payload: this.state.account
            })
            this.setState({edit: false});
        }else{
            this.setState({edit: false});
        }
    }

    cancel(){
        const {account} = this.props;
        let proceed = true;
        
        
        if(!_.isEqual(this.state.account, account)){
            this.setState({warning:true})
            proceed = false;
        }
        if(proceed){
            this.setState({edit: false})
        }
    }

    editAccount = (key, value) => {
        const {account} = this.state;
        const newAccount = {...account};
        newAccount[key] = value;

        this.setState({account: newAccount})
    }

    cancelChanges(){
        const {account} = this.props;
        this.setState({
            edit: false,
            account,
            warning: false
        })
    }

    cancelAction(){
        this.setState({
            warning: false
        })
    }


    render() {
        const {account, edit, warning} = this.state;
        
        if(notEmpty(account)){
            return (
                <div className="common-page">
                    <div className="account-page">
                        <div className="account-row">
                            <div className="title">
                                <span>Full Name</span>
                            </div>
                            <div className="details">
                                <TextField 
                                    value={account.fullName}
                                    disabled= {!edit}
                                    placeholder="Please enter your full name here"
                                    onChange={(_, value) => this.editAccount("fullName", value)}
                                />
                            </div>
                        </div>
                        <div className="account-row">
                            <div className="title">
                                <span>Email</span>
                            </div>
                            <div className="details">
                                <TextField 
                                    value={account.email}
                                    disabled= {!edit}
                                    placeholder="Please enter your email here"
                                    onChange={(_, value) => this.editAccount("email", value)}
                                />
                            </div>
                        </div>
                        <div className="account-row">
                            <div className="title">
                                <span>Username</span>
                            </div>
                            <div className="details">
                                <TextField 
                                    value={account.username}
                                    disabled= {!edit}
                                    placeholder="Please enter your username here"
                                    onChange={(_, value) => this.editAccount("username", value)}
                                />
                            </div>
                        </div>
                        <div className="account-row">
                            <div className="title">
                                <span>Password</span>
                            </div>
                            <div className="details">
                                <TextField 
                                    value={account.password}
                                    disabled= {!edit}
                                    type="password" 
                                    canRevealPassword= {edit}
                                    placeholder="Please enter your password here"
                                    onChange={(_, value) => this.editAccount("password", value)}
                                />
                            </div>
                        </div>
                        <div className="account-row">
                            <div className="title">
                                <span>Address</span>
                            </div>
                            <div className="details">
                                <TextField 
                                    value={account.address}
                                    disabled= {!edit}
                                    placeholder="Please enter your address here"
                                    onChange={(_, value) => this.editAccount("address", value)}
                                />
                            </div>
                        </div>
                        {edit?
                            <div className="button-row">
                                    <PrimaryButton onClick={() => this.save()} text="Save" />
                                    <PrimaryButton onClick={() => this.cancel()} text="Cancel" />
                            </div>
                        :
                            <div className="button-row">
                                    <PrimaryButton onClick={() => this.edit()} text="Edit" />
                            </div>
                        }
                    </div>
                    <Dialog hidden={!warning}>
                        Are you sure you wanna cancel the changes?
                        <DialogFooter>
                            <PrimaryButton onClick={() => this.cancelChanges()} text="Yes" />
                            <DefaultButton onClick={() => this.cancelAction()} text="Cancel" />
                        </DialogFooter>
                    </Dialog>
                </div>
            );
        }else{
            return(<MissingPage/>)
        }
      }
}

function mapStateToProps(state) {
    return { account: state.account }
}


export default connect(mapStateToProps)(Account);