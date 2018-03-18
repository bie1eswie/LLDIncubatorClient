import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params, ParamMap } from '@angular/router';
import { Registration } from '../account/registration';
import { OperationResult } from '../../utilities/operationResult';
import { MembershipService } from '../../services/membership.service';
import { RequiremntService } from '../../services/requirements.service';
import { Client } from '../../workItem/client';
import { WorkItem } from '../../workItem/workItem';
import { WorkItemRequirements } from '../../requirements/workItemRequirement';
import { WorkItemField } from '../../requirements/field';
import { NotificationService } from '../../services/notification.service';
import { WorkItemStatusInfor } from '../../workItem/workItemStatusInfor';
import { StarterViewComponent } from './starterview.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { WorkItemStage } from '../../requirements/workItemStage';
import { User } from '../account/user';
import { Customvalidators } from '../../utilities/validation';
import { UserListService } from '../../services/userList.service';
import { Role } from '../../utilities/role';

@Component({
    selector: 'user-list',
    templateUrl: 'userList.component.html',
})

//---------Export This Component Class---------

export class UserListComponent implements OnInit {

    public resmessage: string;
    public addmessage: string;
    public listmessage: string;
    public currentUser: Registration;
    public users: Registration[];
    public editContactId: any;
    public roleList: Role[];

    //Form Control
    contactForm: FormGroup;
    fullName: FormControl;
    email: FormControl;
    password: FormControl;
    phone: FormControl;
    lastname: FormControl;
    username: FormControl;
    role: FormControl;
    //Constructor
    constructor(private builder: FormBuilder,
        private userService: UserListService ) {
        this.addmessage = 'Add New Contact';
        this.listmessage = 'All Contact';
        this._formGroup();
    }

    ngOnInit() {
        this.resmessage = "";
        this.editContactId = 0;
        this.getContacts();
        this.currentUser = new Registration('','','','');
        this.getRoles();
    }

    //Form Group
    _formGroup() {
        this.fullName = new FormControl('', Validators.required);
        this.email = new FormControl('', Validators.compose([Validators.required, Customvalidators.emailValidator]));
        this.password = new FormControl('');
        this.lastname = new FormControl('');
        this.username = new FormControl('');
        this.phone =  new FormControl('');
        this.role =  new FormControl('');
        this.contactForm = this.builder.group({
            fullName: this.fullName,
            email: this.email,
            phone: this.phone,
            lastname: this.lastname,
            username: this.username,
            password: this.password,
            role: this.role

        });
    }

    //Get All
    getContacts() {
        //debugger
        this.userService.getUsers().subscribe((res: any) => {
                   this.users = res.users;
                });
    }

  getRoles() {
        //debugger
        this.userService.getRole().subscribe((res: any) => {
          debugger;
                   this.roleList = res;
                });
    }

    //Save Form
    saveContact(contact) {
        debugger;
        this.userService.saveUser(contact)
            .subscribe((res:any)=> {
                this.resmessage = res.message;
                this.getContacts();
                this.reset();
            });
    }

    //Get by ID
    editContact(e, m) {
        debugger;
        e.preventDefault();
        this.editContactId = m.id;
        debugger;
        this.currentUser = m;
    }

    //Save Form
    updateContact(contact: any) {
        //debugger
        if (this.editContactId > 0) {
            this.userService.updateUser(contact, this.editContactId)
                .subscribe(response => {
                    this.resmessage = response;
                    this.getContacts();
                    this.reset();
                });
        }
    }

    //Delete
    deleteContact(e, m) {
        debugger;
        e.preventDefault();
        var IsConf = confirm('You are about to delete ' + m.firstName + '. Are you sure?');
        if (IsConf) {
            this.userService.deleteUser(m.id)
                .subscribe(response => {
                    this.resmessage = response;
                    this.getContacts();
                });
        }
    }

    reset() {
        this.editContactId = 0;
        this._formGroup();
        this.currentUser = new Registration('','','','');
    }

}
